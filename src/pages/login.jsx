import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  console.log(firebase);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          console.log("Fetching user data..");
          const userData = await firebase.getUserDataByEmail(email);
          // console.log(userData);
          setUserData(userData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [email, firebase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in User..");
      await firebase.loginUserwithEmailandPassword(email, password);
      const userDatabyemail = await firebase.getUserDataByEmail(email);
      // console.log("data fetched", userDatabyemail);
      // Assuming firebase.isLoggedIn is correctly updated
      if (firebase.isLoggedIn) {
        if (userDatabyemail.isAdmin) {
          navigate("/admin/dashboard");
        } else if (userDatabyemail.isStudent) {
          navigate("/student/dashboard");
        } else if (userDatabyemail.isTeacher) {
          navigate("/teacher/dashboard");
        } else {
          setError("User role not found");
          // Optionally, you can navigate to a default route or show an error message
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
