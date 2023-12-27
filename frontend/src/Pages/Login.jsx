import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/LoginStyles.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';



const Login = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

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


      const userId = res.data[0].id

      if (userId !== undefined) {
        console.log("id is", userId);
        if (res.data[0].type === "student") {
          navigate(`/dashboard/${userId}`);
        }
        else { navigate(`/cdashboard/${userId}`); }
      } else {
        console.log("No id found in the response data.");
      }
    } catch (error) {

      console.error(error.response.data);
    }
  };

  return (
     
    <div className="container-fluid login-container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-20">
          <div className="card border-0 shadow-lg login-card">
            <div className="card-body p-4">
              <h1 className="mb-4 text-center">Log In</h1>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={handleClick}
                >
                  Login
                </button>
              </form>
              <button className="btn btn-danger btn-block mt-3">
                <Link to="/add" className="linkStyle">
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
