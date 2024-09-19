import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BranchManagerNavbar from "./BranchManagerNavbar";
import API_BASE_URL from "../apiConfig";
import "./CreditCardApplicationApproval.css";

const CreditCardApplicationApproval = () => {
  const navigate = useNavigate();
  const [creditCardApplications, setCreditCardApplications] = useState([]);
  const [creditCardDisbursements, setCreditCardDisbursements] = useState([]);
  const [selectedDisbursement, setSelectedDisbursement] = useState(null);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch data on component mount
  useEffect(() => {
    fetchCreditCardApplications();
    fetchCreditCardDisbursements();
  }, []);

  // Fetch credit card applications
  const fetchCreditCardApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/creditcardapplication`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setCreditCardApplications(
          res.data.filter(application =>
            ["Active", "BranchManager Approved", "BranchManager Rejected"].includes(application.ApplicationStatus)
          )
        );
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  // Fetch credit card disbursements
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

  // Get disbursement by application ID
  const getDisbursementByApplicationId = (applicationId) => {
    return creditCardDisbursements.find(
      (disbursement) => disbursement.creditCardApplicationId === applicationId
    );
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter applications based on search and status
  const filterCreditCardApplications = (applications, search, status) => {
    const searchLower = search.toLowerCase();
    const filteredBySearch = searchLower === ""
      ? applications
      : applications.filter(
          (application) =>
            application.CreditCard.CardType.toLowerCase().includes(searchLower) ||
            application.User.Username.toLowerCase().includes(searchLower)
        );

    if (status === "All") {
      return filteredBySearch;
    }

    return filteredBySearch.filter(application => application.ApplicationStatus === status);
  };

  // Handle viewing of disbursement details
  const handleViewDisbursement = (applicationId) => {
    const disbursement = getDisbursementByApplicationId(applicationId);
    if (disbursement) {
      setSelectedDisbursement(disbursement);
      setShowDisbursementModal(true);
    }
  };

  // Close disbursement modal
  const closeDisbursementModal = () => {
    setShowDisbursementModal(false);
    setSelectedDisbursement(null);
  };

  // Update disbursement and application status
  const updateDisbursementStatus = async (disbursementId, applicationId, status, disbursementObj) => {
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
        // Update disbursement and application status
        const updatedDisbursement = {
          ...disbursementResponse.data,
          Status: status,
        };

        const updatedApplication = {
          ...applicationResponse.data,
          ApplicationStatus: status === "Approved" ? "BranchManager Approved" : "BranchManager Rejected",
        };

        await axios.put(
          `${API_BASE_URL}/api/creditcarddisbursements/${disbursementId}`,
          updatedDisbursement,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        await axios.put(
          `${API_BASE_URL}/api/creditcardapplication/${applicationId}`,
          updatedApplication,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Send notification
        const now = new Date();
        const istTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + (5.5 * 60 * 60 * 1000)).toISOString();
        const notificationObj = {
          userId: disbursementObj.CreditCardApplication.User.UserId,
          creditCardId: disbursementObj.CreditCardApplication.CreditCard.CreditCardId,
          creditCardApplicationId: disbursementObj.CreditCardApplication.CreditCardApplicationId,
          creditCardDisbursementId: disbursementObj.CreditCardDisbursementId,
          message: status === "Approved"
            ? `Your credit card application for ${disbursementObj.CreditCardApplication.CreditCard.CardType} has been approved`
            : `Your credit card application for ${disbursementObj.CreditCardApplication.CreditCard.CardType} has been rejected`,
          isRead: false,
          createdAt: istTime,
        };

        await axios.post(`${API_BASE_URL}/api/notifications`, notificationObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        fetchCreditCardApplications();
        fetchCreditCardDisbursements();
        closeDisbursementModal();
      } else {
        console.error("Error updating status.");
      }
    } catch (error) {
      console.error("Error updating disbursement status:", error);
    }
  };

  return (
    <div id="parent">
      <BranchManagerNavbar />
      <div id="creditcardApplicationBody">
        <h1>Credit Card Applications</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search by Card Type or Username..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          
          <label id="filter">
            Filter by Status:
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="All">All</option>
              <option value="CreditCardOfficer Approved">CreditCardOfficer Approved</option>
              <option value="BranchManager Approved">BranchManager Approved</option>
              <option value="BranchManager Rejected">BranchManager Rejected</option>
            </select>
          </label>
        </div>

        <table className="creditcard-application-table">
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
                  <td>{application.CreditCard.CreditLimit}</td>
                  <td>{application.CreditCard.AnnualFee}</td>
                  <td>{application.ApplicationStatus}</td>
                  <td>
                    <button
                      className="viewdisbursementbutton"
                      onClick={() => handleViewDisbursement(application.CreditCard.CreditCardApplicationId)}
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
        <div className="modal">
          <div className="modal-content">
            <h2>Disbursement Details</h2>
            <p>Credit Card: {selectedDisbursement.CreditCardApplication.CreditCard.CardType}</p>
            <p>Username: {selectedDisbursement.CreditCardApplication.User.Username}</p>
            <p>Disbursement Date: {new Date(selectedDisbursement.DisbursementDate).toLocaleDateString()}</p>

            <button
              className="approvebutton"
              onClick={() =>
                updateDisbursementStatus(
                  selectedDisbursement.CreditCardDisbursementId,
                  selectedDisbursement.CreditCardApplication.CreditCardApplicationId,
                  "Approved",
                  selectedDisbursement
                )
              }
            >
              Approve
            </button>

            <button
              className="rejectbutton"
              onClick={() =>
                updateDisbursementStatus(
                  selectedDisbursement.CreditCardDisbursementId,
                  selectedDisbursement.CreditCardApplication.CreditCardApplicationId,
                  "Rejected",
                  selectedDisbursement
                )
              }
            >
              Reject
            </button>

            <button className="closebutton" onClick={closeDisbursementModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCardApplicationApproval;
