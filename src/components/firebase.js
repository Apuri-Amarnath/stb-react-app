import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyAdbuLuTRSkvy-jQUALbbCSUvedaWP6-RI",
  authDomain: "stuendent-teacher-app.firebaseapp.com",
  projectId: "stuendent-teacher-app",
  storageBucket: "stuendent-teacher-app.appspot.com",
  messagingSenderId: "487223211886",
  appId: "1:487223211886:web:cc5d64516be4f62185f37f",
  measurementId: "G-0VVXK30R8T",
  databaseURL: "https://stuendent-teacher-app-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export const Firebaseprovider = (props) => {
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  const getData = (path) => {
    const dataRef = ref(database, path);
    return get(dataRef);
  };

  const deleteData = (path) => {
    const dataRef = ref(database, path);
    return remove(dataRef);
  };

  const updateData = (path, newData) => {
    const dataRef = ref(database, path);
    return update(dataRef, newData);
  };

  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, putData, getData,deleteData,updateData }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export default firebaseAuth;
