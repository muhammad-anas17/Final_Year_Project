import Add from  './Pages/Add';
import Books from './Pages/Books';
import Update from './Pages/Update';
import Dashboard from './Pages/Dashboard';
import './style.css';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  BrowserRouter, 
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Uquestion from './Pages/Uquestion';
import Cdashboard from './Pages/Cdashboard';
import Cquestion from './Pages/Cquestion';
import CollegeForm from './Pages/CollegeForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard/>}/>
        <Route path="/cdashboard/:userId" element={<Cdashboard/>}/>
        <Route path="/uquestion/:userId" element={<Uquestion/>}/>
        <Route path="/cquestion/:userId" element={<Cquestion/>}/>
        <Route path="/collegeform/:userId" element={<CollegeForm/>}/>
      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
