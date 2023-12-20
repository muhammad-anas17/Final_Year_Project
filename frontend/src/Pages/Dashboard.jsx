import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { userId } = useParams();
  console.log("Id is:", { userId })
  const [userData, setUserData] = useState(null);



  const currentDate = new Date();

  // Get the components of the date (year, month, day)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${day}`;


  //  fetching user data 
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
  // fetching college
  const [colleges, setColleges] = useState([])
  useEffect(() => {
    const fetchAllColleges = async () => {
      try {
        const res = await axios.get("http://localhost:8800/college")
        setColleges(res.data);
        console.log(res);


      } catch (err) {
        console.log(err);
      }

    }
    fetchAllColleges()


  }, [])

  //Application for each college  
  const [application, setApplication] = useState({
    uid: userId,
    cid: null,
    sdate: formattedDate,
    status: "pending",
  });
  const handleApply = async (id) => {
    try {
      // Use the callback function provided by setApplication to ensure the latest state
      await setApplication(prevState => ({
        ...prevState,
        cid: id,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  
  // useEffect to trigger action after state update
  useEffect(() => {
    // Log the updated application state
    console.log("Updated Application State:", application);
  
    // Additional logic can go here if needed
    // Call your API here using the updated state
    const postData = async () => {
      try {
        await axios.post("http://localhost:8800/api/apply", application, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Assuming you want to delete after applying, update deleteCollegeId
        setDeleteCollegeId(application.cid);
      } catch (err) {
        console.log(err);
      }
    };
  
    // Only call the API if application.cid is not null
    if (application.cid !== null) {
      postData();
    }
  }, [application]);  // useEffect will run whenever application state changes
  
  
  
  const [deleteCollegeId, setDeleteCollegeId] = useState(null);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/withdraw?collegeId=${deleteCollegeId}&userId=${userId}`);
      setDeleteCollegeId(null);
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
        {colleges.map(college => (
          <div className='college'>
            <h3>College</h3>
            <p>Name: {college.name}</p>
            <p>id: {college.id}</p>

            {deleteCollegeId === college.id ? (
              <button className='Delete' onClick={handleDelete}>
                Withdraw
              </button>
            ) : (
              <button className='Apply' onClick={() => handleApply(college.id)}>
                Apply
              </button>
              
            )}



          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
