import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  increment,
  setDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';

export const createPrompt = async (data: {
  title: string;
  content: string;
  type: string;
  imageUrl?: string;
}) => {
  if (!auth.currentUser) throw new Error('Not authenticated');
  
  const path = 'prompts';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...data,
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName || 'Anonymous',
      likesCount: 0,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const likePrompt = async (promptId: string) => {
  if (!auth.currentUser) throw new Error('Not authenticated');
  
  const userId = auth.currentUser.uid;
  const likeId = `${userId}_${promptId}`;
  const likePath = `likes/${likeId}`;
  const promptPath = `prompts/${promptId}`;
  
  try {
    const likeDocRef = doc(db, 'likes', likeId);
    const likeDoc = await getDoc(likeDocRef);
    
    if (likeDoc.exists()) {
      // Unlike
      await deleteDoc(likeDocRef);
      await updateDoc(doc(db, 'prompts', promptId), {
        likesCount: increment(-1)
      });
      return false;
    } else {
      // Like
      await setDoc(likeDocRef, {
        userId,
        promptId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'prompts', promptId), {
        likesCount: increment(1)
      });
      return true;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `likes_prompts_${promptId}`);
  }
};

export const toggleSavePrompt = async (promptId: string) => {
  if (!auth.currentUser) throw new Error('Not authenticated');
  
  const userId = auth.currentUser.uid;
  const saveId = `${userId}_${promptId}`;
  const savePath = `saved_prompts/${saveId}`;
  
  try {
    const saveDocRef = doc(db, 'saved_prompts', saveId);
    const saveDoc = await getDoc(saveDocRef);
    
    if (saveDoc.exists()) {
      await deleteDoc(saveDocRef);
      return false;
    } else {
      await setDoc(saveDocRef, {
        userId,
        promptId,
        createdAt: serverTimestamp(),
      });
      return true;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, savePath);
  }
};

export const getPrompts = async (limitCount = 20) => {
  const path = 'prompts';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

export const getUserLikedPrompts = async (userId: string) => {
  const path = 'likes';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const promptIds = snapshot.docs.map(doc => doc.data().promptId);
    return promptIds;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};
