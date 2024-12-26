"use client";

import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from "./firebase/firebase";

export function LogoutButton() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      console.log("User signed out successfully!");
      router.push('/'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setClicked(false); 
  };

  return (
    <div>
      <button onClick={handleClick}>
        {clicked ? 'You clicked me!' : 'Log Out'}
      </button>
    </div>
  );
}
