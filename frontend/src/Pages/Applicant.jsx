import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Applicant = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [applicantData, setApplicantData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/status/${userId}`);
        setApplicantData(response.data);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {applicantData ? (
        <div>
          <h2>Applicant Information</h2>
          <p>StatusID: {applicantData.StatusID}</p>
          <p>UserId: {applicantData.UserId}</p>
          <p>SchoolID: {applicantData.SchoolID}</p>
          <p>SubmissionDate: {applicantData.SubmissionDate}</p>
          <p>ReviewStatus: {applicantData.ReviewStatus}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Applicant;
