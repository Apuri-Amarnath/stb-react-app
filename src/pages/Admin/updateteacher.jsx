import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/firebase";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const TeacherList = () => {
  const firebase = useFirebase();

  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newName, setName] = useState("");
  const [newDepartment, setDepartment] = useState("");
  const [newSubject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersData = await firebase.getData("teachers");
        if (teachersData) {
          setTeachers(teachersData);
          setLoading(false);
        } else {
          console.error("No teachers found");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error.message);
      }
    };

    fetchTeachers();
  }, [firebase]);

  const handleUpdateClick = (teacher) => {
    setSelectedTeacher(teacher);
    setName(teacher.username);
    setDepartment(teacher.department);
    setSubject(teacher.subject);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    setName("");
    setDepartment("");
    setSubject("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.updateTeacherData(selectedTeacher.id, {
        username: newName,
        department: newDepartment,
        subject: newSubject,
      });
      setSuccessMessage("Teacher updated successfully");
      setMessageClassName("alert alert-success");
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating teacher:", error.message);
      setSuccessMessage("Teacher update failed");
      setMessageClassName("alert alert-Warning");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Teacher List</h2>
      {loading ? <h2>Loading...</h2> : null}
      {teachers.map((teacher) => (
        <Card key={teacher.id} className="mb-3">
          <Card.Body>
            <Card.Title>{teacher.username}</Card.Title>
            <Card.Text>Email: {teacher.email}</Card.Text>
            <Button
              variant="primary"
              onClick={() => handleUpdateClick(teacher)}
            >
              Update
            </Button>
          </Card.Body>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && (
            <div className={messageClassName}>{successMessage}</div>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={selectedTeacher ? selectedTeacher.email : ""}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={newDepartment}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={newSubject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default TeacherList;
