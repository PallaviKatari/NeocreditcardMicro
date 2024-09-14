import React, { useState, useEffect } from "react";
import "./CreditCardDisbursementForm.css"; // Import the CSS file for styling
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import CreditCardManagerNavbar from "./CreditCardManagerNavbar";

const CreditCardDisbursementForm = () => {
  const navigate = useNavigate();
  const { creditCardApplicationId, creditCardDisbursementId } = useParams(); // Get loanApplicationId and loanDisbursementId from URL params

  const [formData, setFormData] = useState({
    creditCardApplicationId: creditCardApplicationId || "",
    disbursementDate: "",
    creditLimit: "",
    disbursementMethod: "",
    status: "Pending",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (creditCardDisbursementId) {
      fetchCreditCardDisbursement(creditCardDisbursementId);
    }
  }, [creditCardDisbursementId]);

  const fetchCreditCardDisbursement = async (creditCardDisbursementId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/creditcarddisbursements/${creditCardDisbursementId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          creditCardApplicationId: response.data.CreditCardApplicationId,
          disbursementDate: response.data.DisbursementDate.split("T")[0], // Format date for input
          creditLimit: response.data.CreditLimit,
          disbursementMethod: response.data.DisbursementMethod,
          status: response.data.Status,
          remarks: response.data.Remarks || "",
        });
      }
    } catch (error) {
      console.error("Error fetching CreditCard disbursement:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDisbursement = async () => {
    const fieldErrors = {};

    if (!formData.disbursementDate) {
      fieldErrors.disbursementDate = "Disbursement Date is required";
    }

    if (!formData.creditLimit) {
      fieldErrors.creditLimit = "creditLimit is required";
    } else if (
      formData.creditLimit <= 0 
    ) {
      fieldErrors.creditLimit = "creditLimit must be between 1 and 100,000,000";
    }

    if (!formData.disbursementMethod) {
      fieldErrors.disbursementMethod = "Disbursement Method is required";
    }

    if (!formData.remarks) {
      fieldErrors.remarks = "Remarks is required";
    }

    if (Object.values(fieldErrors).some((error) => error)) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const requestObject = {
        creditCardApplicationId: formData.creditCardApplicationId,
        disbursementDate: formData.disbursementDate,
        creditLimit: formData.creditLimit,
        disbursementMethod: formData.disbursementMethod,
        status: formData.status,
        remarks: formData.remarks,
      };

      console.log("CreditCardDisbursement", requestObject);
      console.log("CreditCardDisbursementId", creditCardApplicationId);

      const response = creditCardApplicationId
        ? await axios.put(
            `${API_BASE_URL}/api/creditcarddisbursements/${creditCardApplicationId}`,
            requestObject,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
        : await axios.post(
            `${API_BASE_URL}/api/creditcarddisbursements`,
            requestObject,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

      if (response.status === 200) {
        setSuccessPopup(true);
      }
    } catch (error) {
      console.error("Error during Credit Card disbursement:", error);
    }
  };

  const handleSuccessMessage = () => {
    setSuccessPopup(false);
    navigate(-1); // Navigate back to the previous page
  };

  // Get today's date in YYYY-MM-DD format for restricting past dates
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <CreditCardManagerNavbar />
      <div
        className={`Credit-Card-disbursement-form-container ${
          successPopup ? "blur" : ""
        }`}>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}>
          Back
        </button>
        {creditCardApplicationId ? (
          <h2 className="Editheading">Edit Credit-Card Disbursement</h2>
        ) : (
          <h2 className="heading">Create New Credit-Card Disbursement</h2>
        )}
        <div>
          <div className="form-group">
            <label htmlFor="disbursementDate">
              Disbursement Date <span className="required-asterisk">*</span>
            </label>
            <input
              type="date"
              name="disbursementDate"
              value={formData.disbursementDate}
              onChange={handleChange}
              min={todayDate} // Restrict to today or future dates
            />
            {errors.disbursementDate && (
              <div className="error">{errors.disbursementDate}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="creditLimit">
              Disbursement CreditLimit{" "}
              <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="creditLimit"
              value={formData.creditLimit}
              placeholder="Disbursement CreditLimit"
              onChange={handleChange}
            />
            {errors.creditLimit && (
              <div className="error">{errors.creditLimit}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="disbursementMethod">
              Disbursement Method <span className="required-asterisk">*</span>
            </label>
            <select
              name="disbursementMethod"
              value={formData.disbursementMethod}
              onChange={handleChange}>
              <option value="">Select Method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check</option>
              <option value="Cash">Cash</option>
              <option value="Other">Other</option>
            </select>
            {errors.disbursementMethod && (
              <div className="error">{errors.disbursementMethod}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="remarks">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              placeholder="Remarks"
              onChange={handleChange}
            />
            {errors.remarks && <div className="error">{errors.remarks}</div>}
          </div>
          <button
            className="loanbutton"
            type="button"
            onClick={handleDisbursement}>
            {creditCardDisbursementId ? "Update Disbursement" : "Disburse Loan"}
          </button>
        </div>
      </div>
      {successPopup && (
        <>
          <div className="overlay"></div>
          <div className="modalpopup">
            <p>
              {creditCardApplicationId
                ? "Disbursement Updated Successfully!"
                : "Credit Card Disbursement Successful!"}
            </p>
            <button onClick={handleSuccessMessage}>Ok</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreditCardDisbursementForm;
