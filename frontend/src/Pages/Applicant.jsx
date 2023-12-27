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
  const [gradesData, setGradesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applicant data
        const applicantResponse = await axios.get(`http://localhost:8800/api/status/${userId}`);
        setApplicantData(applicantResponse.data);
        
        // Fetch grades data
        const gradesPromises = applicantResponse.data.map(async (applicant) => {
          const gradesResponse = await axios.get(`http://localhost:8800/api/grades/${applicant.UserId}`);
          return gradesResponse.data;
        });
  
        // Wait for all grades requests to complete
        const allGradesData = await Promise.all(gradesPromises);
  
        setGradesData(allGradesData);
  
        console.log(applicantResponse.data);
        console.log(allGradesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleViewGradesClick = (recordUserId) => {
    // Use the navigate function to go to the desired route
    navigate(`/grades/${recordUserId}`);
  };
  

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
              <button onClick={() => handleViewGradesClick(record.UserId)}>View Grades</button>
              <hr/>
              
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
        <p>Loading applicant data...</p>
      )}

      <h2>Grades Information</h2>
      {gradesData ? (
        gradesData.map((grade) => (
          <div key={grade.StudentID}>
            <p>StudentID: {grade.StudentID}</p>
            <p>UserID: {grade.userID}</p>
            <p>Math Grade: {grade.math_grade}</p>
            <p>English Grade: {grade.english_grade}</p>
            <p>Urdu Grade: {grade.urdu_grade}</p>
            <p>Pakistan Studies Grade: {grade.Pak_studies_grade}</p>
            <p>Islamiat Grade: {grade.islamiat_grade}</p>
            <p>Optional Subject 1: {grade.optional_subject1_name}, Grade: {grade.optional_subject1_grade}</p>
            <p>Optional Subject 2: {grade.optional_subject2_name}, Grade: {grade.optional_subject2_grade}</p>
            <p>Optional Subject 3: {grade.optional_subject3_name}, Grade: {grade.optional_subject3_grade}</p>
            <p>Optional Subject 4: {grade.optional_subject4_name}, Grade: {grade.optional_subject4_grade}</p>
          </div>
        ))
      ) : (
        <p>Loading grades data...</p>
      )}
    </div>
  );
};

export default Applicant;
