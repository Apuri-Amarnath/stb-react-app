import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Firebaseprovider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserwithEmailandPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const handleUserCreation = async (email, isAdmin, isStudent, isTeacher) => {
    const docRef = await addDoc(collection(firestore, "users"), {
      email,
      isAdmin,
      isStudent,
      isTeacher,
    });

    const docId = docRef.id;
    return docId;
  };

  const handleTeacherCreation = async (
    email,
    username,
    department,
    subject
  ) => {
    const docRef = await addDoc(collection(firestore, "teachers"), {
      email,
      username,
      department,
      subject,
    });
    const docId = docRef.id;
    return docId;
  };

  const isLoggedIn = user ? true : false;

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

  const getUserDataByEmail = async (email, path) => {
    try {
      const userRef = collection(firestore, path);
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  };

  const getUserDatafromstore = async (docId, path) => {
    try {
      // Create a reference to the document using its ID
      const docRef = doc(firestore, path, docId);

      const docSnapshot = await getDoc(docRef);

      // Check if the document exists
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        return userData;
      } else {
        // Document does not exist
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserwithEmailandPassword,
        isLoggedIn,
        handleUserCreation,
        getUserDatafromstore,
        getUserDataByEmail,
        handleTeacherCreation,
        putData,
        getData,
        deleteData,
        updateData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export default firebaseAuth;
