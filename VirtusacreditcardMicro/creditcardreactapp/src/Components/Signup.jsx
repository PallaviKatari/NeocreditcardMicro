import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"
import API_BASE_URL from '../apiConfig';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    username: '', // Adjusted field name
    email: '',
    mobileNumber: '', // Adjusted field name
    password: '',
    confirmPassword: '',
    userRole: '', // Adjusted field name and default value
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  }

  const validateField = (fieldName, value) => {
    const fieldErrors = { ...errors };

    switch (fieldName) {
      case 'email':
        fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          ? '' : 'Please enter a valid email';
        break;
      case 'mobileNumber': // Adjusted field name
        fieldErrors.mobileNumber = value.match(/^[0-9]{10}$/) ? '' : 'Mobile number must be 10 digits';
        break;
      case 'password':
        fieldErrors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        fieldErrors.confirmPassword =
          value === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  }

  async function handleSubmit() {
    const fieldErrors = { ...errors };

    if (formData.username.trim() === '') { // Adjusted field name
      fieldErrors.username = 'User Name is required';
    } else {
      fieldErrors.username = '';
    }
    if (formData.email.trim() === '') {
      fieldErrors.email = 'Email is required';
    } else {
      fieldErrors.email = '';
    }
    if (formData.mobileNumber.trim() === '') { // Adjusted field name
      fieldErrors.mobileNumber = 'Mobile Number is required';
    } else {
      fieldErrors.mobileNumber = '';
    }
    if (formData.password === '') {
      fieldErrors.password = 'Password is required';
    } else if (fieldErrors.password.trim() !== '') {
      fieldErrors.password = fieldErrors.password;
    } else {
      fieldErrors.password = '';
    }
    if (formData.confirmPassword === '') {
      fieldErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      fieldErrors.confirmPassword = 'Passwords do not match';
    } else {
      fieldErrors.confirmPassword = '';
    }

    setErrors(fieldErrors);

    const hasErrors = Object.values(fieldErrors).some((error) => error !== '');
    if (!hasErrors) {
      let requestObject = {
        "Username": formData.username, // Adjusted field name
        "Email": formData.email,
        "MobileNumber": formData.mobileNumber, // Adjusted field name
        "Password": formData.password,
        "UserRole": formData.userRole // Adjusted field name
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/register`,
          requestObject,
        );

        if (response.status === 200) {
          setSuccessPopup(true);
        } else {
          setError("Something went wrong, Please try with different data");
        }
      } catch (error) {
        setError("Something went wrong, Please try with different data");
      }
    }
  }

  function handleSuccessMessage() {
    setSuccessPopup(false);
    navigate("/user/login");
  }

  return (
    <div>
      <div className={`signup-form-container ${successPopup ? "blur" : ""}`}>
        <div>
          <h2>Signup</h2>
        </div>
        <div className="signup-form">
          <div className="form-group">
            <label htmlFor="username">User Name <span className="required-asterisk">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="UserName"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span className="required-asterisk">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number<span className="required-asterisk">*</span></label> {/* Adjusted field name */}
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile"
            />
            {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="required-asterisk">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password <span className="required-asterisk">*</span></label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="userRole">Role<span className="required-asterisk">*</span></label> {/* Adjusted field name */}
            <select id="userRole" name="userRole" value={formData.userRole} onChange={handleChange}> {/* Adjusted field name */}
              <option value="">Select Role</option>
              <option value="Customer">Customer</option> {/* Adjusted value */}
              <option value="CreditCardOfficer">CreditCardOfficer</option> {/* Adjusted value */}
              <option value="BranchManager">BranchManager</option>
            </select>
          </div>
          {error && <span id="login_error">{error}</span>}
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <div className="login-link">
            Already have an Account? <Link to="/user/login">Login</Link>
          </div>
        </div>
      </div>
      {successPopup && (
        <div className="success-popup">
          <p>User Registration is Successful!</p>
          <button onClick={handleSuccessMessage}>Ok</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
