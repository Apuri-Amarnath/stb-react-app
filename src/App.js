import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// css
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Home from "./components/Home";
import AdminDashboard from "./pages/Admin/admin";
import AddTeacher from "./pages/Admin/addteacher";
import UpdateTeacher from "./pages/Admin/updateteacher";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin/login" element={<LoginPage />} />
        <Route path="student/login" element={<LoginPage />} />
        <Route path="teacher/login" element={<LoginPage />} />
        <Route path="admin/register" element={<RegisterPage />} />
        <Route path="teacher/register" element={<RegisterPage />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/addteacher" element={<AddTeacher />} />
        <Route path="admin/update-teacher" element={<UpdateTeacher />} />
        <Route path="student/dashboard" element={<AdminDashboard />} />
        <Route path="teacher/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
