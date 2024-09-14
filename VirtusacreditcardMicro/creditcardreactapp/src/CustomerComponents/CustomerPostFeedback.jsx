import React, { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './CustomerPostFeedback.css'; // Assuming you have a CSS file for styling
import API_BASE_URL from '../apiConfig';
import CustomerNavbar from './CustomerNavbar';

const CustomerPostFeedback = () => {
    const userId = useSelector((state) => state.user.userId); // Get the userId from Redux state
  const [feedbackText, setFeedbackText] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    // Console log the userId to verify
    console.log("User ID in MyPostFeedback:", userId);
  }, [userId]);

  const handleChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const validateForm = () => {
    if (!feedbackText) {
      setErrors('Feedback text is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    console.log("userId",userId);
    if (!validateForm()) {
      return;
    }

    const feedbackData = {
      FeedbackId: 0,
      UserId: parseInt(userId), // Assuming userId is a number
      FeedbackText: feedbackText,
      Date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/feedback`, feedbackData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setSuccessPopup(true);
        setFeedbackText(''); // Clear the feedback text after successful submission
      } else {
        setErrors('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      setErrors('Error submitting feedback. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setSuccessPopup(false);
  };

  return (
    <div>
    <CustomerNavbar />
    <div className="feedback-container">
      <h2>Submit Your Feedback</h2>
      <textarea
        value={feedbackText}
        onChange={handleChange}
        placeholder="Enter your feedback here..."
        className="feedback-textarea"
      />
      {errors && <div className="error">{errors}</div>}
      <button onClick={handleSubmit} className="submit-feedback-button">
        Submit Feedback
      </button>

      {successPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Feedback submitted successfully!</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CustomerPostFeedback;
