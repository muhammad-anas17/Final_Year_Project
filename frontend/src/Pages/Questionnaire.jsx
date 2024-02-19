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
    const fetchQuestions = async () => {
      try {
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

    fetchQuestions();
  }, [collegeIds]);

  return (
    <div>
      <h1>Questionnaire</h1>
      <p>College IDs: {collegeIds.join(', ')}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {questions.map(question => (
            <div key={question.QuestionID}>
              <p>Question ID: {question.QuestionID}</p>
              <p>Question Text: {question.QuestionText}</p>
              {/* Add more fields if necessary */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
