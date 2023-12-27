import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2';

const Applicant = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [applicantData, setApplicantData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/status/${userId}`);
        setApplicantData(response.data);

        console.log(response.data);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <header>
        <Navbar2 />
      </header>
      <h2>Applicant Information</h2>
      {applicantData ? (
        Array.isArray(applicantData) ? (
          applicantData.map((record) => (
            <div key={record.StatusID}>
              <p>StatusID: {record.StatusID}</p>
              <p>UserId: {record.UserId}</p>
              <p>SubmissionDate: {record.SubmissionDate}</p>
              <p>ReviewStatus: {record.ReviewStatus}</p>
              <hr />
            </div>
          ))
        ) : (
          <div>
            <p>StatusID: {applicantData.StatusID}</p>
            <p>UserId: {applicantData.UserId}</p>
            <p>SubmissionDate: {applicantData.SubmissionDate}</p>
            <p>ReviewStatus: {applicantData.ReviewStatus}</p>
            
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Applicant;
