import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddStyles.css';

const Add = () => {
  const [book, setBooks]= useState({
    // id: null,
    Name: "",
    email: "",
    password:"",
    DateOfBirth:"",
    Gender:"",
    ContactInformation:"",
    type:"",
  });
  
  const navigate= useNavigate();
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}))
  };
  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.post("http://localhost:8800/user",book);
      
      navigate("/login");

    }catch(err){
      console.log(err);
    }


  }
 return (
  <div className="container-fluid bg-light p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <h1 className="mb-4 text-center">Add New Applicant</h1>
                <form>
                  {/* <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Applicant ID"
                      name="id"
                      onChange={handleChange}
                    />
                  </div> */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Of Birth"
                      name="DateOfBirth"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender"></label>
                    <select
                      id="gender"
                      className="form-control"
                      name="Gender"
                      onChange={handleChange}
                      value={book.Gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      name="ContactInformation"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="type"></label>
                    <select
                      id="type"
                      className="form-control"
                      name="type"
                      onChange={handleChange}
                      value={book.type}
                    >
                      <option value="">Signing Up As</option>
                      <option value="student">Applicant</option>
                      <option value="college">College</option>
                    </select>
                  </div>






                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleClick}
                  >
                    Add Applicant
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
