
import React, { useState, useEffect } from "react";
import "./CreditCardApplicationApproval.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import BranchManagerNavbar from "./BranchManagerNavbar";

const CreditCardApplicationApproval = () => {
  const navigate = useNavigate();
  const [creditCardApplications, setCreditCardApplications] = useState([]);
  const [creditCardDisbursements, setCreditCardDisbursements] = useState([]);
  const [selectedDisbursement, setSelectedDisbursement] = useState(null);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchCreditCardApplications();
    fetchCreditCardDisbursements();
  }, []);

  const fetchCreditCardApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/creditcardapplication`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setCreditCardApplications(res.data.filter(application =>
          ["CreditCardOfficer Approved", "BranchManager Approved", "BranchManager Rejected"].includes(application.ApplicationStatus)
        ));
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const fetchCreditCardDisbursements = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/creditcarddisbursements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setCreditCardDisbursements(res.data);
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const getDisbursementByApplicationId = (applicationId) => {
    return creditCardDisbursements.find(
      (disbursement) => disbursement.creditCardApplicationId === applicationId
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterCreditCardApplications = (applications, search, status) => {
    const searchLower = search.toLowerCase();
    const filteredBySearch = searchLower === "" ? applications : applications.filter(
      (application) =>
        application.CreditCard.CardType.toLowerCase().includes(searchLower) ||
        application.User.Username.toLowerCase().includes(searchLower)
    );

    if (status === "All") {
      return filteredBySearch;
    }

    return filteredBySearch.filter(application => application.ApplicationStatus === status);
  };

  const handleViewDisbursement = (applicationId) => {
    const disbursement = getDisbursementByApplicationId(applicationId);
    if (disbursement) {
      setSelectedDisbursement(disbursement);
      setShowDisbursementModal(true);
    }
  };

  const closeDisbursementModal = () => {
    setShowDisbursementModal(false);
    setSelectedDisbursement(null);
  };

  const updateDisbursementStatus = async (disbursementId, applicationId, status , obj) => {
    try {
      const disbursementResponse = await axios.get(
        `${API_BASE_URL}/api/creditcarddisbursements/${disbursementId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const applicationResponse = await axios.get(
        `${API_BASE_URL}/api/creditcardapplication/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (disbursementResponse.status === 200 && applicationResponse.status === 200) {
        const updatedDisbursement = {
          ...disbursementResponse.data,
          Status: status,
        };

        const updatedApplication = {
          ...applicationResponse.data,
          ApplicationStatus: status === "Approved" ? "BranchManager Approved" : "BranchManager Rejected",
        };

        const disbursementUpdateResponse = await axios.put(
          `${API_BASE_URL}/api/creditcarddisbursements/${disbursementId}`,
          updatedDisbursement,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const applicationUpdateResponse = await axios.put(
          `${API_BASE_URL}/api/creditcardapplication/${applicationId}`,
          updatedApplication,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (disbursementUpdateResponse.status === 200 && applicationUpdateResponse.status === 200) {
          fetchCreditCardApplications(); // Refresh data after status update
          fetchCreditCardDisbursements(); // Refresh disbursements data
          closeDisbursementModal(); // Close the modal


        } else {
          console.error("Error updating status:", disbursementUpdateResponse, applicationUpdateResponse);
        }

       console.log("obj", obj);

   let now = new Date();
      let utcOffset = now.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
      let istTime = new Date(now.getTime() + utcOffset + (5.5 * 60 * 60 * 1000)); // Adding 5.5 hours to UTC
      let formattedDate = istTime.toISOString(); // This will give you the correct IST time in ISO format

      let nobject = {
          userId: obj.CreditCardApplication.User.UserId,
          creditCardId: obj.CreditCardApplication.CreditCard.CreditCardId,
          creditCardApplicationId: obj.CreditCardApplication.CreditCardApplicationId,
          creditCardDisbursementId: obj.CreditCardnDisbursementId,
          message: status === "Approved" 
              ? `Your creditcard application | ${obj.LoanApplication.CreditCard.CardType} | Approved` 
              : `Your creditcard application | ${obj.LoanApplication.CreditCard.CardType} | Rejected`,
          isRead: false,
          createdAt: formattedDate // IST time in ISO format
      };

          const res =   await axios.post(
            `${API_BASE_URL}/api/notifications`,
            nobject,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          console.log("notification", res , nobject);
        
      } else {
        console.error("Error fetching data for update:", disbursementResponse, applicationResponse);
      }

    } catch (error) {
      console.error("Error updating disbursement status:", error);
    }
  };

  return (
    <div id="parent">
      <BranchManagerNavbar />
      <div id="loanApplicationBody">
        <h1>Credit Card Applications</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search by Loan Type or Username..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          
          <label id='filter'>
            Filter by Status:
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="All">All</option>
              <option value="CreditCardOfficer Approved">CreditCardOfficer Approved</option>
              <option value="BranchManager Approved">BranchManager Approved</option>
              <option value="BranchManager Rejected">BranchManager Rejected</option>
            </select>
          </label>
        </div>

        <table className="loan-application-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Card Type</th>
              <th>Application Date</th>
              <th>Credit Limit</th>
              <th>Annual Fee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCreditCardApplications(creditCardApplications, searchValue, statusFilter).length === 0 ? (
              <tr>
                <td colSpan="7" className="no-records">Oops! No records found</td>
              </tr>
            ) : (
              filterCreditCardApplications(creditCardApplications, searchValue, statusFilter).map((application) => (
                <tr key={application.CreditCardApplicationId}>
                  <td>{application.User.Username}</td>
                  <td>{application.CreditCard.CardType}</td>
                  <td>{new Date(application.ApplicationDate).toLocaleDateString()}</td>
                  <td>${application.CreditLimit}</td>
                  <td>{application.AnnualFee}</td>
                  <td>{application.ApplicationStatus}</td>
                  <td>
                    <button
                      className="viewdisbursementbutton"
                      onClick={() => handleViewDisbursement(application.CreditCardApplicationId)}
                    >
                      View Disbursement
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDisbursementModal && selectedDisbursement && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>CreditCard Disbursement Details</h2>
            <p><strong>Disbursement Date:</strong> {new Date(selectedDisbursement.DisbursementDate).toLocaleDateString()}</p>
            <p><strong>Disbursement Amount:</strong> ${selectedDisbursement.CreditLimit}</p>
            <p><strong>Disbursement Method:</strong> {selectedDisbursement.DisbursementMethod}</p>
            <p><strong>Status:</strong> {selectedDisbursement.Status}</p>
            <p><strong>Remarks:</strong> {selectedDisbursement.Remarks}</p>
            {selectedDisbursement.Status === "Pending" ? (
              <>
                <button
                  className="greenButton"
                  id="greenButton"
                  onClick={() =>
                    updateDisbursementStatus(
                      selectedDisbursement.CreditCardDisbursementId,
                      selectedDisbursement.CreditCardApplicationId,
                      "Approved",
                      selectedDisbursement
                    )
                  }
                >
                  Approve
                </button>
                <button
                  className="redButton"
                  id="redButton"
                  onClick={() =>
                    updateDisbursementStatus(
                      selectedDisbursement.CreditCardDisbursementId,
                      selectedDisbursement.CreditCardApplicationId,
                      "Rejected",
                      selectedDisbursement
                    )
                  }
                >
                  Reject
                </button>
              </>
            ) : selectedDisbursement.Status === "Approved" ? (
              <button
                className="redButton"
                id="redButton"
                onClick={() =>
                  updateDisbursementStatus(
                    selectedDisbursement.CreditCardDisbursementId,
                    selectedDisbursement.CreditCardApplicationId,
                    "Rejected",
                    selectedDisbursement
                  )
                }
              >
                Reject
              </button>
            ) : (
              <button
                className="greenButton"
                id="greenButton"
                onClick={() =>
                  updateDisbursementStatus(
                    selectedDisbursement.CreditCardDisbursementId,
                    selectedDisbursement.CreditCardApplicationId,
                    "Approved",
                    selectedDisbursement
                  )
                }
              >
                Approve
              </button>
            )}
            <button className="close-modal" onClick={closeDisbursementModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCardApplicationApproval;