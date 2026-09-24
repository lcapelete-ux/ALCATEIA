import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe
} from 'firebase/firestore';
import { Participant, RegistrationFormData } from '../types';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore using the configured database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test as required by skill guidelines
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network unavailable.');
    }
  }
}
testConnection();

const PARTICIPANTS_COLLECTION = 'participants';

export const FirebaseService = {
  /**
   * Subscribe to real-time updates of participants from Firestore
   */
  subscribeParticipants(
    onData: (participants: Participant[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const q = query(collection(db, PARTICIPANTS_COLLECTION), orderBy('bibNumber', 'asc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const participants: Participant[] = [];
        snapshot.forEach((d) => {
          participants.push(d.data() as Participant);
        });
        onData(participants);
      },
      (err) => {
        console.error('Firestore snapshot listener error:', err);
        if (onError) onError(err);
      }
    );
  },

  /**
   * Fetch all participants once from Firestore
   */
  async getParticipants(): Promise<Participant[]> {
    try {
      const q = query(collection(db, PARTICIPANTS_COLLECTION), orderBy('bibNumber', 'asc'));
      const snapshot = await getDocs(q);
      const list: Participant[] = [];
      snapshot.forEach((d) => {
        list.push(d.data() as Participant);
      });
      return list;
    } catch (e) {
      console.error('Error fetching participants from Firestore:', e);
      return [];
    }
  },

  /**
   * Save or update a participant in Firestore
   */
  async saveParticipant(participant: Participant): Promise<void> {
    try {
      const docRef = doc(db, PARTICIPANTS_COLLECTION, participant.id);
      await setDoc(docRef, participant, { merge: true });
    } catch (e) {
      console.error('Error saving participant in Firestore:', e);
      throw e;
    }
  },

  /**
   * Update specific fields of a participant
   */
  async updateParticipant(id: string, updates: Partial<Participant>): Promise<void> {
    try {
      const docRef = doc(db, PARTICIPANTS_COLLECTION, id);
      await updateDoc(docRef, updates as { [x: string]: any });
    } catch (e) {
      console.error('Error updating participant in Firestore:', e);
      throw e;
    }
  },

  /**
   * Delete a participant from Firestore
   */
  async deleteParticipant(id: string): Promise<void> {
    try {
      const docRef = doc(db, PARTICIPANTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error('Error deleting participant in Firestore:', e);
      throw e;
    }
  },

  /**
   * Seed multiple participants to Firestore in batch
   */
  async seedInitialData(participants: Participant[]): Promise<void> {
    try {
      for (const p of participants) {
        const docRef = doc(db, PARTICIPANTS_COLLECTION, p.id);
        await setDoc(docRef, p);
      }
    } catch (e) {
      console.error('Error seeding participants in Firestore:', e);
    }
  }
};
