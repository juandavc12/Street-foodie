import React, { useState } from 'react';

import firebaseApp from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (register) {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('🚀 ~ file: Login.js ~ line 22 ~ submit ~ user', user);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div>
      <h1>{register ? 'Sign up' : 'Log in'}</h1>
      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" onClick={submit}>
          {register ? 'Sign up' : 'Log in'}
        </button>
        <button onClick={() => signInWithRedirect(auth, googleProvider)}>
          Acceder con google
        </button>
      </div>
      <button onClick={() => setRegister(!register)}>
        {register ? 'Have you account? Log in' : 'Do not have account? Sign Up'}
      </button>
    </div>
  );
}
