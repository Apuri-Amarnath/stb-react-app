import React, { useState } from "react";
import {useFirebase} from "../firebase"; 

const AddTeacher = () => {

  const {putData} = useFirebase();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const { v4: uuidv4 } = require('uuid');
  
  const uid = uuidv4();

  console.log("uid:", uid);

  const handleAddTeacher = () => {

    putData("teacher/" + uid , { name, department, subject, isTeacher : 1})
      .then(() => {
        console.log("Teacher added successfully!");
        setName("");
        setDepartment("");
        setSubject("");
      })
      .catch((error) => {
        console.error("Error adding teacher:", error);
      });
  };

  return (
    <div>
      <h2>Add Teacher</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button onClick={handleAddTeacher}>Add Teacher</button>
    </div>
  );
};

export default AddTeacher;
