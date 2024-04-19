import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const firebase = useFirebase();
  const location = useLocation();

  console.log(firebase);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      const isAdminLogin = location.pathname === "/admin/login";
      const isStudentLogin = location.pathname === "/student/login";
      const isTeacherLogin = location.pathname === "/teacher/login";
      setIsAdmin(isAdminLogin);
      setIsStudent(isStudentLogin);
      setIsTeacher(isTeacherLogin);
    }
  }, [location, firebase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login in User..");
      const result = await firebase.loginUserwithEmailandPassword(
        email,
        password
      );
      const user = result.user;
      console.log(user.isAdmin);

      if (user) {
        setIsAdmin(location.pathname === "/admin/login" && user.isAdmin);
        setIsStudent(location.pathname === "/student/login" && user.isStudent);
        setIsTeacher(location.pathname === "/teacher/login" && user.isTeacher);

        if (isAdmin && user.isAdmin) {
          setRedirectTo("/admin/dashboard");
        } else if (isStudent && user.isStudent) {
          setRedirectTo("/student/dashboard");
        } else if (isTeacher && user.isTeacher) {
          setRedirectTo("/teacher/dashboard");
        } else {
          throw new Error("Invalid user role for this login page");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }
  if (firebase.isLoggedIn) {
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" />;
    } else if (isStudent) {
      return <Navigate to="/student/dashboard" />;
    } else if (isTeacher) {
      return <Navigate to="/teacher/dashboard" />;
    }
  }
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
