import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book, setBooks]= useState({
    id: null,
    Name: "",
    email: "",
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
      
      // navigate("/");

    }catch(err){
      console.log(err);
    }


  }
 return (
    <div className='Form'>
      <h1>Add New Record</h1>
      <input type="number" placeholder='ID' name='id' onChange={handleChange} />
      <input type="text" placeholder='name' name='Name' onChange={handleChange} />
      <input type="text" placeholder='email' name='email' onChange={handleChange} />

      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
