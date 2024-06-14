import { useState, useEffect } from 'react';
import { auth } from '../../firebase-config';
import { 
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export default function AuthFirebase({ getData }) {
  const [signInStatusTextContent, setSignInStatusTextContent] = useState("Signed out");
  const [signInButtonTextContent, setSignInButtonTextContent] = useState("Sign in");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const toggleSignIn = () => {
    if (!auth.currentUser) {
      const provider = new GoogleAuthProvider();
      //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      signInWithPopup(auth, provider)
        .then(function (result) {
          if (!result) return;
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.',
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
        });
    } else {
      signOut(auth);
    }
    setButtonDisabled(true);
  }

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      console.log(`HERE-1`);
      if (user) {
        // User is signed in.
        console.log(user);
        setSignInStatusTextContent('Signed in');
        setSignInButtonTextContent('Sign out');
        localStorage.setItem("authToken", true);
        console.log(`HERE-2`);
        getData();
      } else {
        // User is signed out.
        setSignInStatusTextContent('Signed out');
        setSignInButtonTextContent('Sign in with Google');
        localStorage.removeItem("authToken");
        console.log(`HERE-3`);
        getData();
      }
      setButtonDisabled(false);
    });
  }, []);

  return (
    <div style={{
      textAlign:"center"
    }}>
      <header>
        <h3>Firebase Authentication W/ Google</h3>
      </header>

      <main>
        <div>
          <div style={{
              paddingBottom:"5px"
          }}>
            <button
              disabled={isButtonDisabled}
              id="quickstart-sign-in"
              onClick={toggleSignIn}
              style={{
                paddingBottom:"5px",
                padding:"5px"
              }}
            >
              {signInButtonTextContent}
            </button>
            <div style={{
              textAlign:"center",
              paddingTop:"5px"
            }}>
              Firebase sign-in status:&nbsp;
              <span style={{
                color: signInStatusTextContent === "Signed in" ? "green" : "red"
              }}>{signInStatusTextContent}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}