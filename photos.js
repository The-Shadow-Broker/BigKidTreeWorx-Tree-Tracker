import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

/* Photos are immutable files in Storage, referenced by the job doc.
   Flow: downscale -> uploadPhoto() -> push the returned object into
   the job's `photos` array with updateJob(). No merge conflicts since
   you only ever add or delete a whole photo. */

export async function uploadPhoto(jobId, blob) {
  const id = crypto.randomUUID();
  const path = `jobs/${jobId}/${id}.jpg`;
  const r = ref(storage, path);
  await uploadBytes(r, blob, { contentType: 'image/jpeg' });
  const url = await getDownloadURL(r);
  return { id, path, url }; // store this in job.photos[]
}

export function deletePhoto(path) {
  return deleteObject(ref(storage, path));
}

/* Downscale a File/Blob from the camera before upload — keeps Storage
   small and uploads fast on a phone. Returns a JPEG Blob (~maxEdge px). */
export async function downscale(file, maxEdge = 1600, quality = 0.7) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
  return new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', quality)
  );
}
