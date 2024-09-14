import React, { useState, useEffect } from "react";
import "./CreditCardForm.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../apiConfig";
import LoanManagerNavbar from "./CreditCardManagerNavbar";

const CreditCardForm = () => {
  const navigate = useNavigate();
  const { creditCardId } = useParams();

  const [formData, setFormData] = useState({
    cardType: "",
    creditLimit: "",
    interestRate: "",
    annualFee: "",
    minimumPaymentPercentage: "",
    cashAdvanceFee: "",
    gracePeriodDays: "",
    latePaymentFee: "",
    Status: "Active",
    expiryDate: "",
    issuingBank: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});

  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (creditCardId) {
      fetchCreditCard(creditCardId);
    }
  }, [creditCardId]);

  const fetchCreditCard = async (creditCardId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/creditcards/${creditCardId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("fetchcreditcard :", response);

      if (response.status === 200) {
        setFormData({
          cardType: response.data.CardType,
          creditLimit: response.data.CreditLimit,
          interestRate: response.data.InterestRate,
          annualFee: response.data.AnnualFee,
          minimumPaymentPercentage: response.data.MinimumPaymentPercentage,
          cashAdvanceFee: response.data.CashAdvanceFee,
          gracePeriodDays: response.data.GracePeriodDays,
          latePaymentFee: response.data.LatePaymentFee,
          Status: response.data.Status,
          expiryDate: response.data.ExpiryDate,
          issuingBank: response.data.IssuingBank,
          cardholderName: response.data.CardholderName,
        });
      }
    } catch (error) {
      // navigate('/error');
      console.log("Error :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCreditCard = async () => {
    const fieldErrors = {};

    if (!formData.cardType) {
      fieldErrors.cardType = "CreditCard Type is required";
    }

    if (!formData.creditLimit) {
      fieldErrors.creditLimit = "Credit Limit is required";
    }

    if (!formData.interestRate) {
      fieldErrors.interestRate = "Interest Rate is required";
    }

    if (!formData.annualFee) {
      fieldErrors.annualFee = "Annual Fee is required";
    }

    if (!formData.minimumPaymentPercentage) {
      fieldErrors.minimumPaymentPercentage =
        "Minimum Payment Percentage is required";
    }

    if (!formData.cashAdvanceFee) {
      fieldErrors.cashAdvanceFee = "Cash Advance Fee is required";
    }

    if (!formData.gracePeriodDays) {
      fieldErrors.gracePeriodDays = "Grace Period Days is required";
    }

    if (!formData.latePaymentFee) {
      fieldErrors.latePaymentFee = "Late Payment Fee is required";
    }

    if (!formData.Status) {
      fieldErrors.Status = "Status is required";
    }

    if (!formData.expiryDate) {
      fieldErrors.expiryDate = "Expiry Date is required";
    }

    if (!formData.issuingBank) {
      fieldErrors.issuingBank = "Issuing Bank is required";
    }

    if (!formData.cardholderName) {
      fieldErrors.cardholderName = "Card holder Name is required";
    }

    if (Object.values(fieldErrors).some((error) => error)) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const requestObject = {
        cardType: formData.cardType,
        creditLimit: formData.creditLimit,
        interestRate: formData.interestRate,
        annualFee: formData.annualFee,
        minimumPaymentPercentage: formData.minimumPaymentPercentage,
        cashAdvanceFee: formData.cashAdvanceFee,
        gracePeriodDays: formData.gracePeriodDays,
        latePaymentFee: formData.latePaymentFee,
        Status: formData.Status || "Active",
        expiryDate: formData.expiryDate,
        issuingBank: formData.issuingBank,
        cardholderName: formData.cardholderName,
      };

      console.log("requestObject", requestObject);

      const response = creditCardId
        ? await axios.put(
            `${API_BASE_URL}/api/creditcards/${creditCardId}`,
            requestObject,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
        : await axios.post(`${API_BASE_URL}/api/creditcards`, requestObject, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

      if (response.status === 200) {
        setSuccessPopup(true);
      }
    } catch (error) {
      // navigate('/error');
      console.log("Error :", error);
    }
  };

  const handleSuccessMessage = () => {
    setSuccessPopup(false);
    navigate(-1);
  };

  return (
    <div>
      <LoanManagerNavbar />
      <div className={`loan-form-container ${successPopup ? "blur" : ""}`}>
        {creditCardId ? (
          <>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}>
              Back
            </button>
            <h2 className="Editheading">Edit Credit Card</h2>
          </>
        ) : (
          <h2>Create New Loan</h2>
        )}
        <div>
          <div className="form-group">
            <label htmlFor="cardType">
              Credit Card Type <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="cardType"
              value={formData.cardType}
              placeholder="Card Type"
              onChange={handleChange}
            />
            {errors.cardType && <div className="error">{errors.cardType}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="creditLimit">
              Credit Limit <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="creditLimit"
              value={formData.creditLimit}
              placeholder="Credit Limit"
              onChange={handleChange}
            />
            {errors.creditLimit && (
              <div className="error">{errors.creditLimit}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="interestRate">
              Interest Rate <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              placeholder="Interest Rate"
              onChange={handleChange}
            />
            {errors.interestRate && (
              <div className="error">{errors.interestRate}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="annualFee">
              Annual Fee <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="annualFee"
              value={formData.annualFee}
              placeholder="Annual Fee"
              onChange={handleChange}
            />
            {errors.annualFee && (
              <div className="error">{errors.annualFee}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="minimumPaymentPercentage">
              Minimum Payment Percentage{" "}
              <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="minimumPaymentPercentage"
              value={formData.minimumPaymentPercentage}
              placeholder="Minimum Payment Percentage"
              onChange={handleChange}
            />
            {errors.minimumPaymentPercentage && (
              <div className="error">{errors.minimumPaymentPercentage}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cashAdvanceFee">
              Cash Advance Fee <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="cashAdvanceFee"
              value={formData.cashAdvanceFee}
              placeholder="Cash Advance Fee"
              onChange={handleChange}
            />
            {errors.cashAdvanceFee && (
              <div className="error">{errors.cashAdvanceFee}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="gracePeriodDays">
              Grace Period Days <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="gracePeriodDays"
              value={formData.gracePeriodDays}
              placeholder="Grace Period Days"
              onChange={handleChange}
            />
            {errors.gracePeriodDays && (
              <div className="error">{errors.gracePeriodDays}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="latePaymentFee">
              Late Payment Fee <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="latePaymentFee"
              value={formData.latePaymentFee}
              placeholder="Late Payment Fee"
              onChange={handleChange}
            />
            {errors.latePaymentFee && (
              <div className="error">{errors.latePaymentFee}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="Status">
              Status <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="Status"
              value={formData.Status}
              placeholder="Status"
              onChange={handleChange}
            />
            {errors.Status && <div className="error">{errors.Status}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">
              Expiry Date <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="expiryDate"
              value={formData.expiryDate}
              placeholder="Expiry Date"
              onChange={handleChange}
            />
            {errors.expiryDate && (
              <div className="error">{errors.expiryDate}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="issuingBank">
              Issuing Bank <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="issuingBank"
              value={formData.issuingBank}
              placeholder="Issuing Bank"
              onChange={handleChange}
            />
            {errors.issuingBank && (
              <div className="error">{errors.issuingBank}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cardholderName">
              Cardholder Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="cardholderName"
              value={formData.cardholderName}
              placeholder="Cardholder Name"
              onChange={handleChange}
            />
            {errors.cardholderName && (
              <div className="error">{errors.cardholderName}</div>
            )}
          </div>
          <button
            className="loanbutton"
            type="button"
            onClick={handleAddCreditCard}>
            {creditCardId ? "Update Credit Card" : "Add Credit Card"}
          </button>
        </div>
      </div>
      {successPopup && (
        <>
          <div className="overlay"></div>
          <div className="modalpopup">
            <p>
              {creditCardId ? "Updated Successfully!" : "Successfully Added!"}
            </p>
            <button onClick={handleSuccessMessage}>Ok</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreditCardForm;
