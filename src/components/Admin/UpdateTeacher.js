import React, { useState, useEffect } from "react";
import { useFirebase } from "../firebase";

const TeacherList = () => {
  const { getData } = useFirebase();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData("teacher")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const teachersArray = Object.entries(snapshot.val()).map(
            ([key, value]) => ({ id: key, ...value })
          );
          setTeachers(teachersArray);
        } else {
          console.error("Teacher data not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
        setLoading(false);
      });
  }, [getData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Teacher List</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <h3>{teacher.id}</h3>
            <p>Teacher name: {teacher.name}</p>
            <p>Department: {teacher.department}</p>
            <p>Subject: {teacher.subject}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
