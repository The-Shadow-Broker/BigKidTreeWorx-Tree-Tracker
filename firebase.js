import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/* Firebase console -> Project settings -> "Your apps" -> config object.
   NOTE: this config is PUBLIC by design and ships in your GitHub-hosted JS.
   That's fine and expected — security comes from Firestore/Storage *rules*
   + Auth, NOT from hiding these values. Lock down rules before real data. */
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);

/* Offline-first cache. This is what replaces Dexie: reads AND writes work
   offline and sync automatically when the connection returns. */
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const storage = getStorage(app);
