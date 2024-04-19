import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../Admin/Adminlogin";
import firebaseAuth from '../../context/firebase'
import AddTeacher from "./Addteacher";
import TeacherList from "./UpdateTeacher";

const auth = firebaseAuth;
const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser.email);
        setUser(currentUser);
      } else {
        console.log("User is logged out");
        setUser(null);
        navigate("/admin/login");
      }
    }, (error) => {
      console.error("Auth state change error:", error);
    });
    return unsubscribe;
  }, [navigate]);

  if (user === null) {
    return <AdminLogin />; 
  }

  return (
    <div className="Dashboard-admin">
      <div className="admin-welcome-bar">
      <h1>Welcome to Admin Dashboard</h1>
      <h2> hello {user.email}</h2>
      <button onClick={() => signOut(auth)}>Signout</button>
      </div>
      <div className="admin-roles">
        <AddTeacher />
        <TeacherList />
      </div>
    </div>
  );
};

export default AdminDashboard;
