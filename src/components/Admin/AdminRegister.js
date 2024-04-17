import React, { useState } from "react";
import { useFirebase } from "../firebase";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const { signupUserWithEmailAndPassword, putData } = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerAdmin = (email, password) => {
    signupUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        putData("admin/" + user.uid, {
          email: user.email,
          isAdmin: 1,
        }).then(alert("user created!"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div className="Admin-register-page">
      <h1>Admin Register</h1>
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        value={email}
        required
        placeholder="Enter your Email"
      ></input>
      <label>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
        placeholder="Enter your password"
        value={password}
      ></input>
      <button onClick={() => registerAdmin(email, password)}>register</button>
      <Link to="/admin/login">
        <button>login</button>
      </Link>
    </div>
  );
};

export default AdminRegister;
