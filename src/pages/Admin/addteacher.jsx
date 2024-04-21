import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit=(e)=>{
    
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

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="Text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Department</Form.Label>
          <Form.Control
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            type="Text"
            placeholder="Enter Department"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
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
