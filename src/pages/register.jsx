import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const firebase = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(firebase);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  const isLoggedIn = firebase.isLoggedIn;

  useEffect(() => {
    const isAdminRegister = location.pathname === "/admin/register";
    setIsAdmin(isAdminRegister);
    setIsStudent(location.pathname === "/student/register");
    setIsTeacher(location.pathname === "/admin/addteacher");
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Signup User..");
      const duplicate = await firebase.getUserDataByEmail(email, "users");
      console.log(duplicate);
      //eliminate duplicate registrations
      if (duplicate) {
        setSuccessMessage("User already exists try again");
        setMessageClassName("alert alert-warning");
      } else {
        // Sign up the user with email and password
        const result = await firebase.signupUserWithEmailAndPassword(
          email,
          password
        );
        console.log(result);
        // Store user data in Firestore
        const docid = await firebase.handleUserCreation(
          email,
          isAdmin,
          isStudent,
          isTeacher
        );

        console.log("Signup success..");

        const userData = await firebase.getUserDatafromstore(docid, "users");

        if (userData) {
          setEmail("");
          setPassword("");
          setSuccessMessage("User added successfully");
          setMessageClassName("alert alert-success");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }
        console.log("Retrieved user data:", userData);

        //redirecting with the data from store
        let destination = "/";
        if (userData.isAdmin) {
          destination = "/admin/dashboard";
        } else if (userData.isStudent) {
          destination = "/student/dashboard";
        } else if (userData.isTeacher) {
          destination = "/teacher/dashboard";
        }

        // Navigate to the appropriate dashboard
        navigate(destination);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // const { user } = result; // Destructure user object from result
  // if (user) {
  //  // Set isAdmin property based on the signup form
  //  const userData = {
  //    ...user,
  //    isAdmin: isAdmin ? true : false,
  //    isStudent: isStudent ? true : false,
  //  };
  //  console.log("User isAdmin:", userData.isAdmin, userData.isStudent); // Log isAdmin property of user
  //}
  return (
    <div className="container mt-5">
      {successMessage && (
        <div className={messageClassName}>{successMessage}</div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
