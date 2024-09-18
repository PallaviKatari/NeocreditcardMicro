import React, { useState } from "react";
import axios from "axios";
import "./ViewFeedback.css"; // Assuming you have a CSS file for styling
import API_BASE_URL from "../apiConfig";
import { useSelector } from 'react-redux';
import CreditCardManagerNavbar from "./CreditCardManagerNavbar";


const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

//   const role = useSelector((state) => state.user.role); 
  const role =  localStorage.getItem('userRole'); 

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setFeedbacks(response.data);
      } else {
        console.error("Failed to fetch feedbacks.");
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  React.useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfilePopup(true);
  };

  const closeProfilePopup = () => {
    setShowProfilePopup(false);
    setSelectedUser(null);
  };


  return (
    <div>
      <CreditCardManagerNavbar />
      <div className="feedback-wrapper">
        <div className={`feedback-container ${showProfilePopup ? 'blur' : ''}`}>
          <h2>Customer Feedbacks</h2>
          {feedbacks.length === 0 ? (
            <p>No feedbacks found.</p>
          ) : (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Username</th>
                  <th>Date</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <tr key={feedback.FeedbackId}>
                    <td>{index + 1}</td>
                    <td>{feedback.User.Username}</td>
                    <td>{new Date(feedback.Date).toLocaleDateString()}</td>
                    <td>{feedback.FeedbackText}</td>
                    <td>
                      <button
                        className="view-profile-button"
                        onClick={() => handleViewProfile(feedback.User)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showProfilePopup && selectedUser && (
          <div className="popup-overlay">
            <div className="profile-popup">
              <h2>User Profile</h2>
              {/* <p><strong>User ID:</strong> {selectedUser.UserId}</p> */}
              <p><strong>Username:</strong> {selectedUser.Username}</p>
              <p><strong>Email:</strong> {selectedUser.Email}</p>
              <p><strong>Mobile Number:</strong> {selectedUser.MobileNumber}</p>
              {/* <p><strong>User Role:</strong> {selectedUser.UserRole}</p> */}
              <button className="close-popup-button" onClick={closeProfilePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;
