import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export default function FollowButton({ targetUserId }) {
  const [following, setFollowing] = useState(false);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const checkFollow = async () => {
      const docRef = doc(db, 'follows', `${currentUserId}_${targetUserId}`);
      const snap = await getDoc(docRef);
      setFollowing(snap.exists());
    };
    checkFollow();
  }, []);

  const toggleFollow = async () => {
    const docRef = doc(db, 'follows', `${currentUserId}_${targetUserId}`);
    if (following) {
      await deleteDoc(docRef);
      setFollowing(false);
    } else {
      await setDoc(docRef, { from: currentUserId, to: targetUserId });
      setFollowing(true);
    }
  };

  return (
    <Button
      title={following ? 'Lopeta seuraaminen' : 'Seuraa'}
      onPress={toggleFollow}
    />
  );
}
