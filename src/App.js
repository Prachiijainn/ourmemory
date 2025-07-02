import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Flipbook from "./Flipbook";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [memories, setMemories] = useState([]);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleSaveMemory = async () => {
    if (!note || !mood) return;
    await addDoc(collection(db, 'memories'), {
      user: user.uid,
      note,
      mood,
      createdAt: new Date().toISOString()
    });
    setNote('');
    setMood('');
    fetchMemories();
  };

  const fetchMemories = async () => {
    const q = query(collection(db, 'memories'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const memList = snapshot.docs.map(doc => doc.data());
    setMemories(memList.filter(m => m.user === user.uid));
  };

  useEffect(() => {
    if (user) fetchMemories();
  }, [user]);

  if (!user) {
    return (
      <div className="login-screen">
        <h1>Memory Lane 💫</h1>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    );
  }

  return (
    <div className="app-container">
       <h1 className="center-title"> US 💖</h1>
        <Flipbook />
        
      
    </div>
  );
}

export default App;