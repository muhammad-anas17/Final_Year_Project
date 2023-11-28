import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { userId } = useParams();
  console.log("Id is:",{userId})
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {userData ? (
        <div>
          <p>User ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
         
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
