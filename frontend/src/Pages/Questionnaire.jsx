import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Questionnaire = () => {
  const { userId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const collegeIds = queryParams.getAll('collegeIds');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to the API endpoint with college IDs as parameters
        const response = await axios.get(`http://localhost:8800/api/questions`, {
          params: { collegeIds: collegeIds.join(',') },
        });

        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [collegeIds]);

  return (
    <div>
      <h1>Questionnaire</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.QuestionID}>
              {question.QuestionText} (College ID: {question.CollegeID})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Questionnaire;
