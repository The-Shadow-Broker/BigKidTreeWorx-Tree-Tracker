import { useEffect, useState } from 'react';
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp, increment,
} from 'firebase/firestore';
import { db } from './firebase';

/* ============================================================
   READS — live subscriptions.
   onSnapshot fires immediately with cached data, then again on
   every change (yours or from the other device). The cleanup
   return detaches the listener. This is your "pull": set it up
   once and the data stays current on its own.
   ============================================================ */
function useLive(path, sortField) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = sortField
      ? query(collection(db, path), orderBy(sortField))
      : collection(db, path);

    const unsub = onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return unsub; // detach listener on unmount
  }, [path, sortField]);

  return { rows, loading };
}

export const useCustomers = () => useLive('customers', 'name');
export const useJobs = () => useLive('jobs', 'scheduledDate');

/* ============================================================
   WRITES — just call these. The listeners above refresh the UI
   automatically, so there is no separate "push" or refetch.
   Offline writes queue locally and sync when back online.
   ============================================================ */
const stamp = (data) => ({
  ...data,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});

export function addCustomer(data) {
  return addDoc(collection(db, 'customers'), stamp(data));
}

export function addJob(data) {
  return addDoc(collection(db, 'jobs'), stamp({
    status: 'lead',
    scheduledDate: null,   // null => sits in the "waiting" pool
    dayOrder: 0,
    rescheduleCount: 0,
    workTypes: [],
    photos: [],            // array of { id, path, url } from photos.js
    ...data,
  }));
}

export function updateJob(id, patch) {
  return updateDoc(doc(db, 'jobs', id), { ...patch, updatedAt: serverTimestamp() });
}

export function deleteJob(id) {
  return deleteDoc(doc(db, 'jobs', id));
}

/* Reschedule helper — sets the date, bumps status, and counts the
   push-back atomically with increment(). Pass a 'YYYY-MM-DD' string
   (or null to send it back to the pool). */
export function rescheduleJob(id, newDate) {
  return updateDoc(doc(db, 'jobs', id), {
    scheduledDate: newDate,
    status: newDate ? 'scheduled' : 'quoted',
    rescheduleCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}
