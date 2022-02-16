import React, { useState } from 'react';

import firebaseApp from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const auth = getAuth(firebaseApp);

export default function Login() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (register) {
      const user = await createUserWithEmailAndPassword(auth, email, password);
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
      </div>
      <button onClick={() => setRegister(!register)}>
        {register ? 'Have you account? Log in' : 'Do not have account? Sign Up'}
      </button>
    </div>
  );
}
