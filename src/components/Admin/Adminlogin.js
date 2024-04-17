import React, { useState } from "react";
import firebaseAuth from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = firebaseAuth;
const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log("Login successful!");
        navigate("/admin/dashboard");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Admin-page">
      <div className="Admin-sigin-page">
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <Link to="/admin/register">
          <button>Register Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Adminlogin;
