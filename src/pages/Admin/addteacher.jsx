import { useFirebase } from "../../context/firebase";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddTeacher = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("adding Teacher....");
    try {
      const duplicate = await firebase.getUserDataByEmail(email, "teachers");
      console.log(duplicate);
      if (duplicate) {
        setSuccessMessage("Teacher already exists");
        setMessageClassName("alert alert-warning");
      } else {
        const docid = await firebase.handleTeacherCreation(
          email,
          name,
          department,
          subject
        );
        const userData = await firebase.getUserDatafromstore(docid, "teachers");
        if (userData) {
          setEmail("");
          setName("");
          setDepartment("");
          setSubject("");
          setSuccessMessage("Teacher added successfully");
          setMessageClassName("alert alert-success");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }
        console.log("Retrieved user data:", userData);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

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
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="Text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText2">
          <Form.Label>Department</Form.Label>
          <Form.Control
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            type="Text"
            placeholder="Enter Department"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText3">
          <Form.Label>subject</Form.Label>
          <Form.Control
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            type="Text"
            placeholder="Enter Subject"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          add Teacher
        </Button>
      </Form>
    </div>
  );
};

export default AddTeacher;
