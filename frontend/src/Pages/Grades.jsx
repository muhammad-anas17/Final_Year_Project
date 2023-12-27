import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar2';

const Grades = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [grade, setGradesData] = useState(null);

    
  return (
    <div>
      <h2>Grades Information</h2>
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
 
    </div>
    
  )
}

export default Grades
