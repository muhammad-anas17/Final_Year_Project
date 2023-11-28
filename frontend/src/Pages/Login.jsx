import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); 
  const [books,setBooks] =useState([]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/login', user);
      setBooks(res.data);
      console.log("Response data:", res.data);

      // Check the structure of res.data and update the following line accordingly
      const userId = res.data[0].id
  
      if (userId !== undefined) {
        console.log("id is", userId);
        navigate(`/dashboard/${userId}`);
      } else {
        console.log("No id found in the response data.");
      }
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-success" onClick={handleClick}>
        Login
      </button>
      <button className="btn btn-danger">
        <Link to="/add" className="linkStyle">
          Sign Up
        </Link>
      </button>
    </div>
  );
};

export default Login;
