import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export default function LikeButton({ videoId }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(db, 'videos', videoId);
      const snap = await getDoc(docRef);
      const data = snap.data();
      setLikes(data?.likes || 0);
      setHasLiked(data?.likedBy?.includes(uid) || false);
    };
    fetchLikes();
  }, [videoId]);

  const toggleLike = async () => {
    const docRef = doc(db, 'videos', videoId);
    const snap = await getDoc(docRef);
    let data = snap.data() || {};
    let updatedLikes = data.likes || 0;
    let likedBy = data.likedBy || [];

    if (likedBy.includes(uid)) {
      updatedLikes--;
      likedBy = likedBy.filter(id => id !== uid);
    } else {
      updatedLikes++;
      likedBy.push(uid);
    }

    await updateDoc(docRef, {
      likes: updatedLikes,
      likedBy,
    });

    setLikes(updatedLikes);
    setHasLiked(!hasLiked);
  };

  return (
    <>
      <Button title={hasLiked ? '❤️ Poista tykkäys' : '🤍 Tykkää'} onPress={toggleLike} />
      <Text>Tykkäyksiä: {likes}</Text>
    </>
  );
}