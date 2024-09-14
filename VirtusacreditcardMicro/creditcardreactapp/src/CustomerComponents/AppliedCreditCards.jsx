import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AppliedCreditCards.css";
import API_BASE_URL from "../apiConfig";
import CustomerNavbar from "./CustomerNavbar";

const AppliedCreditCards = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [creditCardToDelete, setCreditCardToDelete] = useState(null);
  const [appliedCreditCards, setAppliedCreditCards] = useState([]);
  const [filteredCreditCards, setFilteredCreditCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [maxRecords, setMaxRecords] = useState(1);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [isAccountModal, setIsAccountModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [errors, setErrors] = useState({}); // State to track validation errors
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state to track success modal visibility

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/creditcardapplication/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setAppliedCreditCards(response.data);
        setFilteredCreditCards(response.data);
        setMaxRecords(response.data.length);
      }
    } catch (error) {
      console.error("Error fetching applied credit cards:", error);
      navigate("/error");
    }
  }

  const totalPages = Math.ceil(maxRecords / limit);

  const filterCreditCards = (search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return appliedCreditCards;
    return appliedCreditCards.filter((creditCard) =>
      creditCard.CreditCard.CardType.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    const filteredCreditCards = filteredCreditCards(inputValue);
    setMaxRecords(filteredCreditCards.length);
    setFilteredCreditCards(filteredCreditCards);
  };

  const toggleSort = (order) => {
    setSortValue(order);

    const sortedCreditCards = [...filteredCreditCards].sort((a, b) => {
      return order === 1
        ? new Date(a.ApplicationDate) - new Date(b.ApplicationDate)
        : order === -1
        ? new Date(b.ApplicationDate) - new Date(a.ApplicationDate)
        : 0;
    });

    setFilteredCreditCards(sortedCreditCards);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDeleteClick = (creditCardApplicationId) => {
    setCreditCardToDelete(creditCardApplicationId);
    setShowDeletePopup(true);
  };

  async function handleConfirmDelete() {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/creditcardapplication/${creditCardToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchData();
      }
      closeDeletePopup();
    } catch (error) {
      console.error("Error deleting Credit Card application:", error);
      navigate("/error");
    }
  }

  const closeDeletePopup = () => {
    setCreditCardToDelete(null);
    setShowDeletePopup(false);
  };

  const validateAccountDetails = () => {
    let validationErrors = {};

    if (!accountDetails.accountHolder) {
      validationErrors.accountHolder = "Account holder name is required.";
    }

    if (!accountDetails.accountNumber) {
      validationErrors.accountNumber = "Account number is required.";
    } else if (!/^\d{9,18}$/.test(accountDetails.accountNumber)) {
      validationErrors.accountNumber =
        "Account number must be between 9 and 18 digits.";
    }

    if (!accountDetails.ifscCode) {
      validationErrors.ifscCode = "IFSC code is required.";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(accountDetails.ifscCode)) {
      validationErrors.ifscCode = "Invalid IFSC code.";
    }

    return validationErrors;
  };

  const handleAccountDetailsSubmit = async () => {
    const validationErrors = validateAccountDetails();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedCreditCard = {
        ...selectedCreditCard,
        AccountHolder: accountDetails.accountHolder,
        AccountNumber: accountDetails.accountNumber,
        IFSCCode: accountDetails.ifscCode,
      };
      const response = await axios.put(
        `${API_BASE_URL}/api/creditcardapplication/${selectedCreditCard.creditCardApplicationId}`,
        updatedCreditCard,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setSelectedCreditCard(null);
        setIsAccountModal(false); // Reset modal type
        setShowSuccessModal(true); // Show success modal
        fetchData();
      }
    } catch (error) {
      console.error("Error updating credit card application:", error);
      navigate("/error");
    }
  };

  const openAccountModal = (creditCard) => {
    setSelectedCreditCard(creditCard);
    setIsAccountModal(true); // Set modal type to account form
    setAccountDetails({
      accountHolder: creditCard.AccountHolder || "",
      accountNumber: creditCard.AccountNumber || "",
      ifscCode: creditCard.IFSCCode || "",
    });
    setErrors({}); // Reset errors
  };

  const openCreditCardDetailsModal = (creditCard) => {
    setSelectedCreditCard(creditCard);
    setIsAccountModal(false); // Set modal type to loan details
  };

  const closeModal = () => {
    setSelectedCreditCard(null);
    setShowSuccessModal(false); // Close success modal if open
  };

  const renderActionButtons = (creditCard) => {
    // Disable "Add Account Details" and "Delete" buttons if BranchManager has approved or rejected
    const isFinalStage = creditCard.ApplicationStatus.includes("BranchManager");

    return (
      <>
        <button
          className="viewLoanDetailsButton"
          onClick={() => openCreditCardDetailsModal(creditCard)}>
          View CreditCard Details
        </button>
        <button
          className="accountDetailsButton"
          onClick={() => openAccountModal(creditCard)}
          disabled={
            creditCard.ApplicationStatus !== "CreditCard Officer Approved" ||
            isFinalStage
          }
          style={{
            backgroundColor:
              creditCard.ApplicationStatus !== "CreditCard Officer Approved" ||
              isFinalStage
                ? "grey"
                : "initial",
            cursor:
              creditCard.ApplicationStatus !== "CreditCard Officer Approved" ||
              isFinalStage
                ? "not-allowed"
                : "pointer",
          }}>
          Add Account Details
        </button>
        <button
          id="redButton"
          onClick={() => handleDeleteClick(creditCard.creditCardApplicationId)}
          disabled={creditCard.ApplicationStatus !== "Pending" || isFinalStage}
          style={{
            backgroundColor:
              creditCard.ApplicationStatus !== "Pending" || isFinalStage
                ? "grey"
                : "initial",
            color: "black",
            cursor:
              creditCard.ApplicationStatus !== "Pending" || isFinalStage
                ? "not-allowed"
                : "pointer",
            // pointerEvents: loan.ApplicationStatus !== "Pending" || isFinalStage ? "none" : "auto"
          }}>
          Delete
        </button>
      </>
    );
  };

  return (
    <div>
      <CustomerNavbar />
      <div
        id="loanHomeBody"
        className={
          showDeletePopup || selectedCreditCard || showSuccessModal
            ? "page-content blur"
            : "page-content"
        }>
        <h1>Applied CreditCards</h1>
        <input
          id="searchBox1"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />

        <table>
          <thead>
            <tr>
              <th>CreditCard Name</th>
              <th>Description</th>
              <th>
                <div id="submissionDate">Submission Date</div>
                <div>
                  <button className="sortButtons" onClick={() => toggleSort(1)}>
                    ⬆️
                  </button>
                  <button
                    className="sortButtons"
                    onClick={() => toggleSort(-1)}>
                    ⬇️
                  </button>
                </div>
              </th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {filteredCreditCards.length ? (
            <tbody>
              {filteredCreditCards
                .slice((page - 1) * limit, page * limit)
                .map((creditCard) => (
                  <tr key={creditCard.creditCardApplicationId}>
                    <td>{creditCard.CreditCard.CardType}</td>
                    <td>{creditCard.CreditCard.CreditLimit}</td>
                    <td>
                      {
                        new Date(creditCard.ApplicationDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </td>
                    <td>{creditCard.ApplicationStatus}</td>
                    <td>{renderActionButtons(creditCard)}</td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="no-records-cell">
                  Oops! No Records Found
                </td>
              </tr>
            </tbody>
          )}
        </table>

        {filteredCreditCards.length > 0 && (
          <div>
            <button
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={closeDeletePopup}>Cancel</button>
        </div>
      )}

      {selectedCreditCard && (
        <div className="modal">
          <div className="modal-content">
            {isAccountModal ? (
              <>
                <h3>Add Account Details</h3>
                <div className="form-group">
                  <label>Account Holder:</label>
                  <input
                    type="text"
                    value={accountDetails.accountHolder}
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        accountHolder: e.target.value,
                      })
                    }
                  />
                  {errors.accountHolder && (
                    <div className="error">{errors.accountHolder}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Account Number:</label>
                  <input
                    type="text"
                    value={accountDetails.accountNumber}
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                  {errors.accountNumber && (
                    <div className="error">{errors.accountNumber}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>IFSC Code:</label>
                  <input
                    type="text"
                    value={accountDetails.ifscCode}
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        ifscCode: e.target.value,
                      })
                    }
                  />
                  {errors.ifscCode && (
                    <div className="error">{errors.ifscCode}</div>
                  )}
                </div>
                <button onClick={handleAccountDetailsSubmit}>Submit</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            ) : (
              <>
                <h3>Credit Card Details</h3>
                <p>
                  <strong>Card Type:</strong>{" "}
                  {selectedCreditCard.CreditCard.CardType}
                </p>
                <p>
                  <strong>Interest Rate:</strong>{" "}
                  {selectedCreditCard.CreditCard.InterestRate}%
                </p>
                <p>
                  <strong>Credit Limit:</strong> $
                  {selectedCreditCard.CreditCard.CreditLimit}
                </p>
                <p>
                  <strong>Annual Fee:</strong>{" "}
                  {selectedCreditCard.CreditCard.AnnualFee}
                </p>
                <p>
                  <strong>Minimum Payment Percentage:</strong> $
                  {selectedCreditCard.CreditCard.MinimumPaymentPercentage}
                </p>
                <p>
                  <strong>Cash Advance Fee:</strong>{" "}
                  {selectedCreditCard.CreditCard.CashAdvanceFee} months
                </p>
                <p>
                  <strong>Grace Period Days:</strong> $
                  {selectedCreditCard.CreditCard.GracePeriodDays}
                </p>
                <button onClick={closeModal}>Close</button>
              </>
            )}
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Success</h3>
            <p>Account details have been successfully added!</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedCreditCards;
