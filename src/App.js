import './App.css';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const { name, email, photo } = user;

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      })
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleGoogleSignIn}>Google Sign In Button</button>
        <h2>{name}</h2>
        <h4>{email}</h4>
        <img src={photo} alt="" />
      </div>
    </div>
  );
}

export default App;
