import React, { useContext } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// dari config
import firebaseConfig from "./config/firebase";

import { useAuthState } from 'react-firebase-hooks/auth'

firebase.initializeApp(firebaseConfig);

const FirebaseContext = React.createContext();

export function useFirebase() {

  return useContext(FirebaseContext);
}

function FirebaseProvider(props) {

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const storage = firebase.storage();

  const [user, loading, error] = useAuthState(auth);

  return <FirebaseContext.Provider value={{
    auth,
    firestore,
    storage,
    user,
    loading,
    error
  }}>
    {props.children}
  </FirebaseContext.Provider>
}

export default FirebaseProvider;