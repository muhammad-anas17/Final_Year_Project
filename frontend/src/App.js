import Add from  './Pages/Add';
import Books from './Pages/Books';
import Update from './Pages/Update';
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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
