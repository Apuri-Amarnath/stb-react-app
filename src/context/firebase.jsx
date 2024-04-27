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
  updateDoc,
} from "firebase/firestore";
import { getDatabase, ref, set, remove } from "firebase/database";

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
  //get whole document
  const getData = async (collectionPath) => {
    try {
      const collectionRef = collection(firestore, collectionPath);
      const querySnapshot = await getDocs(collectionRef);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data;
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  };

  //updateTeacher
  const updateTeacherData = async (
    id,
    { username: name, department, subject }
  ) => {
    try {
      const teacherRef = doc(firestore, "teachers", id);
      await updateDoc(teacherRef, { username: name, department, subject });
      console.log("Teacher data updated successfully");
    } catch (error) {
      console.error("Error updating teacher data:", error);
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
        updateTeacherData,
        getData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export default firebaseAuth;
