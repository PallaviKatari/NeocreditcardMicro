import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./CreditCardDisbursementForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import API_BASE_URL from "../apiConfig";
import CreditCardManagerNavbar from "./CreditCardManagerNavbar";

function CreditCardDisbursementForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const creditCardApplicationId = localStorage.getItem("CreditCardApplicationId");
  const [successPopup, setSuccessPopup] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let requestObject = {
      creditCardApplicationId: creditCardApplicationId, // Set from localStorage
      disbursementDate: data.disbursementDate,
      creditLimit: data.creditLimit,
      disbursementMethod: data.disbursementMethod,
      status: data.status,
      remarks: data.remarks || "",
    };

    try {
      const response = await axios.post(
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
      console.error("Error submitting credit card disbursement:", error);
      navigate("/error");
    }
  };

  function handleSuccessMessage() {
    setSuccessPopup(false);
    navigate("/availablecreditcarddisbursement");
  }

  return (
    <div>
      <CreditCardManagerNavbar />
      <div className={`container ${successPopup ? "blur" : ""}`}>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <h2 className="form-title">Credit Card Disbursement Form</h2>
        </div>
        <form className="disbursement-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="disbursementDate" className="form-label">
              Disbursement Date:<span className="required-asterisk">*</span>
            </label>
            <Controller
              name="disbursementDate"
              control={control}
              rules={{ required: "Disbursement date is required" }}
              render={({ field }) => (
                <div>
                  <input
                    id="disbursementDate"
                    type="date"
                    className="form-input"
                    {...field}
                  />
                  {errors.disbursementDate && (
                    <div className="error">{errors.disbursementDate.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="creditLimit" className="form-label">
              Credit Limit:<span className="required-asterisk">*</span>
            </label>
            <Controller
              name="creditLimit"
              control={control}
              rules={{
                required: "Credit limit is required",
                min: { value: 500, message: "Minimum credit limit is 500" },
                max: { value: 1000000, message: "Maximum credit limit is 1,000,000" },
              }}
              render={({ field }) => (
                <div>
                  <input
                    id="creditLimit"
                    type="number"
                    className="form-input"
                    {...field}
                  />
                  {errors.creditLimit && (
                    <div className="error">{errors.creditLimit.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="disbursementMethod" className="form-label">
              Disbursement Method:<span className="required-asterisk">*</span>
            </label>
            <Controller
              name="disbursementMethod"
              control={control}
              rules={{ required: "Disbursement method is required" }}
              render={({ field }) => (
                <div>
                  <select id="disbursementMethod" className="form-input" {...field}>
                    <option value="">Select Method</option>
                    <option value="Card Issuance">Card Issuance</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                  {errors.disbursementMethod && (
                    <div className="error">{errors.disbursementMethod.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status:<span className="required-asterisk">*</span>
            </label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <div>
                  <select id="status" className="form-input" {...field}>
                    <option value="">Select Status</option>
                    <option value="Disbursed">Disbursed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                  {errors.status && (
                    <div className="error">{errors.status.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="remarks" className="form-label">
              Remarks:
            </label>
            <Controller
              name="remarks"
              control={control}
              render={({ field }) => (
                <div>
                  <input id="remarks" type="text" className="form-input" {...field} />
                </div>
              )}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      {successPopup && (
        <>
          <div className="overlay"></div>
          <div className="modalpopup">
            <p className="successmessage">Successfully Disbursed!</p>
            <button className="ok-button" onClick={handleSuccessMessage}>
              Ok
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreditCardDisbursementForm;
