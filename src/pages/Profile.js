import React from 'react';

import firebaseApp from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth(firebaseApp);

export default function Profile() {
  return (
    <>
      <h1>Sesión iniciada</h1>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </>
  );
}
