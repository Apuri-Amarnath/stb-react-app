import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Adminlogin from "./components/Admin/Adminlogin";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminDashboard from "./components/Admin/Admindashboard";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin/login" element={<Adminlogin />} />
          <Route path="admin/register" element={<AdminRegister/>}/>
          <Route path="admin/dashboard" element={<AdminDashboard/>}/>
        </Routes>
    </div>
  );
}

export default App;
