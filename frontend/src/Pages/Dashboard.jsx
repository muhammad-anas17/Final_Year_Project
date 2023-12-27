import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './Dashboard.css';

const Dashboard = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

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

  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    const fetchAllColleges = async () => {
      try {
        const res = await axios.get("http://localhost:8800/college");
        setColleges(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllColleges();
  }, []);

  const [application, setApplication] = useState({
    uid: userId,
    cid: null,
    sdate: formattedDate,
    status: "pending",
  });

  const handleApply = async (id) => {
    try {
      await setApplication((prevState) => ({
        ...prevState,
        cid: id,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Updated Application State:", application);

    const postData = async () => {
      try {
        await axios.post("http://localhost:8800/api/apply", application, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setDeleteCollegeId(application.cid);
      } catch (err) {
        console.log(err);
      }
    };

    if (application.cid !== null) {
      postData();
    }
  }, [application]);

  const [deleteCollegeId, setDeleteCollegeId] = useState(null);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/withdraw?collegeId=${deleteCollegeId}&userId=${userId}`);
      setDeleteCollegeId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedColleges, setSelectedColleges] = useState([]);

  const handleCheckboxChange = (collegeId) => {
    setSelectedColleges((prevSelectedColleges) => {
      if (prevSelectedColleges.includes(collegeId)) {
        return prevSelectedColleges.filter((id) => id !== collegeId);
      } else {
        return [...prevSelectedColleges, collegeId];
      }
    });
  };

  const handleApplyAll = async () => {
    try {
      const applyAllPromises = selectedColleges.map(async (collegeId) => {
        const applicationData = {
          uid: userId,
          cid: collegeId,
          sdate: formattedDate,
          status: 'pending',
        };

        await axios.post('http://localhost:8800/api/apply', applicationData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setDeleteCollegeId(collegeId);
      });

      await Promise.all(applyAllPromises);
      setSelectedColleges([]);
    } catch (err) {
      console.log(err);
    }
  };

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

      <div className='colleges'>
        {colleges.map((college) => (
          <div className='college' key={college.id}>
            <h3>College</h3>
            <p>Name: {college.name}</p>
            <p>id: {college.id}</p>

            {deleteCollegeId === college.id ? (
              <button className='Delete' onClick={handleDelete}>
                Withdraw
              </button>
            ) : (
              <label>
                <input
                  type='checkbox'
                  onChange={() => handleCheckboxChange(college.id)}
                  checked={selectedColleges.includes(college.id)}
                />
                Apply
              </label>
            )}
          </div>
        ))}
        {selectedColleges.length > 0 && (
          <button className='Apply' onClick={handleApplyAll}>
            Apply to Selected Colleges
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
