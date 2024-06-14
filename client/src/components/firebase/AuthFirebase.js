import { useState, useEffect } from 'react';
import { auth } from '../../firebase-config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export default function AuthFirebase({ getData }) {
  console.log("# Rendering");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInButtonTextContent, setSignInButtonTextContent] = useState("Sign in");
  const [signInStatusTextContent, setSignInStatusTextContent] = useState("Signed out");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  if (auth?.currentUser) {
    console.log(email, password);
  } else {
    console.log("#Unknown");
  }

  const toggleSignIn = () => {
    if (auth.currentUser) {
      signOut(auth);
      localStorage.removeItem("authToken");
    } else {
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      signInWithEmailAndPassword(auth, email, password)
      .then(getDataFirebase)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        setButtonDisabled(false);
      });
      localStorage.setItem("authToken", true);
    }
    setButtonDisabled(true);
  }

  const handleSignUp = () => {
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create user with email and pass.
    createUserWithEmailAndPassword(auth, email, password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setSignInStatusTextContent('Signed in');
        setSignInButtonTextContent('Sign out');
      } else {
        // User is signed out.
        setSignInStatusTextContent('Signed out');
        setSignInButtonTextContent('Sign in');
      }
      setButtonDisabled(false);
    });
  }, []);

  return (
    <div>
      <header>
        <h2>Firebase Authentication</h2>
      </header>
      <main>
        <p>
          Enter an email and password below and either sign in to an
          existing account or sign up
        </p>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        &nbsp;&nbsp;&nbsp;
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button
          disabled={isButtonDisabled}
          onClick={toggleSignIn}
        >
          {signInButtonTextContent}
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <br />
        <div>
          Firebase sign-in status:
          <span>{signInStatusTextContent}</span>
        </div>
      </main>
    </div>
  );
}