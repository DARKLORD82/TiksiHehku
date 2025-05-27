// ModeratorAuth.js
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function ensureModeratorAccount() {
  const auth = getAuth();
  const email = 'jani_aalto@hotmail.com';
  const password = 'London82';

  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Moderator logged in');
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Moderator account created');
    } else {
      console.error('🛑 Moderaattoritili virhe:', err);
    }
  }
}

