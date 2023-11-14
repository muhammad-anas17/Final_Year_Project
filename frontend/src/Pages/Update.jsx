import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
  const [book, setBooks]= useState({
    Name: "",
    email: "",
  });

  const [error,setError] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();
  const bookId = location.pathname.split("/")[2];
  const handleChange= (e) =>{
    console.log("Target name:", e.target.name);
    console.log("Target value:", e.target.value);
    setBooks((prev)=>({...prev, [e.target.name]: e.target.value}))
  };
  const handleClick= async (e) =>{
    e.preventDefault();
    try{
      console.log(book);
      await axios.put(`http://localhost:8800/user/${bookId}`, book);
      
      // navigate("/");

    }catch(err){
      console.log(err);
    }


  }
 return (
    <div className='Form'>
      <h1>Update Record</h1>
      {/* <input type="number" placeholder='ID' name='id' onChange={handleChange} /> */}
      <input type="text" placeholder='name' name='Name' onChange={handleChange} />
      <input type="text" placeholder='email' name='email' onChange={handleChange} />

      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
