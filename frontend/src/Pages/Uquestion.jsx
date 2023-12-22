import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Uquestion = () => {
  const { userId } = useParams();
  console.log("Id is:", { userId });

  const [book, setBooks]= useState({
    userid: userId,
    DateOfBirth:"",
    Gender:"",
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
      await axios.post("http://localhost:8800/student",book);
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

export default Uquestion
