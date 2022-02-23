import React, { useState } from 'react';

import firebaseApp from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    if (register) {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('🚀 ~ file: Login.js ~ line 22 ~ submit ~ user', user);
      navigate('/profile');
    } else {
      signInWithEmailAndPassword(auth, email, password);
      console.log('🚀 ~ file: Login.js ~ line 25 ~ submit ~ auth', auth);
    }
  };

  return (
    <div className="Login">
      <h1>{register ? 'Sign up' : 'Log in'}</h1>
      <div className="FormLogin">
        <input
          placeholder="Email"
          type="email"
          id="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" onClick={submit}>
          {register ? 'Sign up' : 'Log in'}
        </button>
        <button
          onClick={() => signInWithRedirect(auth, googleProvider)}
          className="google1"
        >
          <div className="google">
            <img alt="img3" className="imgGoogle" src="Login-4.png" />
            <p>Continue with Google</p>
          </div>
        </button>
        <button onClick={() => setRegister(!register)}>
          {register
            ? 'Have you account? Log in'
            : 'Do not have account? Sign Up'}
        </button>
      </div>
    </div>
  );
}
