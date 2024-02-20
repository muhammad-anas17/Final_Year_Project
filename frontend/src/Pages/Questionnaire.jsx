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
    <div className="container mt-5">
      <h1 className="mb-4">Questionnaire</h1>
      <h5 className="mb-4">College IDs: {collegeIds.join(', ')}</h5>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {questions.map(question => (
            <div className="card mb-3" key={question.QuestionID}>
              <div className="card-body">
                <h5 className="card-title">Question ID: {question.QuestionID}</h5>
                <p className="card-text">Question Text: {question.QuestionText}</p>
                {/* Add more fields if necessary */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
