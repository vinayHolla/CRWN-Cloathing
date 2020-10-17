import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyCzfL1-VSRCD3erfBPlWYmNw3M7Lc7mToE",
  authDomain: "crwn-cloathing-2104e.firebaseapp.com",
  databaseURL: "https://crwn-cloathing-2104e.firebaseio.com",
  projectId: "crwn-cloathing-2104e",
  storageBucket: "crwn-cloathing-2104e.appspot.com",
  messagingSenderId: "959500630105",
  appId: "1:959500630105:web:6e3b50f7a7052ac41fd948"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
