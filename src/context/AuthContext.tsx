import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  username: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  username: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    }
  };

  useEffect(() => {
    testConnection();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
          // Create user profile if it doesn't exist
          const newUsername = user.displayName || user.email?.split('@')[0] || 'User';
          await setDoc(userDocRef, {
            username: newUsername,
            email: user.email,
            avatarUrl: user.photoURL,
            createdAt: serverTimestamp(),
          });
          setUsername(newUsername);
        } else {
          setUsername(userDoc.data().username);
        }
      } else {
        setUsername(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
