import React, { useState, useEffect } from "react";
import "./CreditCardRequest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import CreditCardManagerNavbar from "./CreditCardManagerNavbar";

const CreditCardRequest = () => {
  const [creditCardRequests, setCreditCardRequests] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState("-1");
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(2);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/creditcardapplication`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCreditCardRequests(response.data);
      }
    } catch (error) {
      console.error("Error fetching credit card application requests:", error);
      navigate("/error");
    }
  }

  const filteredCreditCardRequests = creditCardRequests
    .filter(
      (request) =>
        statusFilter === "-1" ||
        request.ApplicationStatus.toLowerCase() === statusFilter.toLowerCase()
    )
    .filter((request) =>
      request.CreditCard?.CardType.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    );

  const sortedCreditCardRequests = filteredCreditCardRequests.sort((a, b) => {
    if (sortValue === 1) {
      return new Date(a.ApplicationDate) - new Date(b.ApplicationDate);
    } else if (sortValue === -1) {
      return new Date(b.ApplicationDate) - new Date(a.ApplicationDate);
    }
    return 0;
  });

  const paginatedCreditCardRequests = sortedCreditCardRequests.slice(
    (page - 1) * pagesize,
    page * pagesize
  );

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const toggleSort = (order) => {
    setSortValue(order);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleApprove = async (request) => {
    if (!request) {
      console.error("No credit card selected for approval.");
      return;
    }

    const requestObject = {
      ...request,
      ApplicationStatus: "Credit Card Officer Approved", // Approving the creditcard
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/creditcardapplication/${request.CreditCardApplicationId}`,
        requestObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchData(); // Refresh data after approval
      }
    } catch (error) {
      console.error("Error approving CreditCard application:", error);
    }
  };

  const handleReject = async (request) => {
    if (!request) {
      console.error("No CreditCard selected for rejection.");
      return;
    }

    const requestObject = {
      ...request,
      ApplicationStatus: "Credit Card Officer Rejected", // Rejecting the creditcard
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/creditcardapplication/${request.creditCardApplicationId}`,
        requestObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchData(); // Refresh data after rejection
      }
    } catch (error) {
      console.error("Error rejecting Credit Card application:", error);
    }
  };

  // const handleRowExpand = (index) => {
  //   if (expandedRow === index) {
  //     setShowModal(false);
  //     setExpandedRow(null);
  //   } else {
  //     setSelectedCreditCard(paginatedCreditCardRequests[index]);
  //     setShowModal(true);
  //     setExpandedRow(index);
  //   }
  // };

  const handleCreditCardDisbursement = (creditCardApplicationId) => {
    navigate(`/creditcardDisbursementForm/${creditCardApplicationId}`);
  };

  const CreditCardDetailsModal = ({ creditCard, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <button id="redButtons" onClick={onClose}>
          Close
        </button>
        <div className="address-details">
          <h3>More Details</h3>
          <div>
            <b>Remarks:</b> {creditCard.Remarks}
          </div>
          <div>
            <b>Employment Status:</b> {creditCard.EmploymentStatus}
          </div>
          <div>
            <b>Annual Income:</b> ${creditCard.AnnualIncome}
          </div>
          <div>
            <img
              src={creditCard.ProofOfIdentity}
              alt="Credit Card Proof"
              style={{ height: "300px", width: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const totalPages = Math.ceil(filteredCreditCardRequests.length / pagesize);

  return (
    <div id="home">
      <CreditCardManagerNavbar />
      <div className="creditcardrequest">
        <h1>CreditCard Requests for Approval</h1>
        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <label id="filter">
            Filter by Status:
            <select value={statusFilter} onChange={handleFilterChange}>
              <option value="-1">All</option>
              <option value="Pending">Pending</option>
              <option value="CreditCard Officer Approved">
                CreditCard Officer Approved
              </option>
              <option value="CreditCard Officer Rejected">
                CreditCard Officer Rejected
              </option>
              <option value="BranchManager Approved">
                BranchManager Approved
              </option>
              <option value="BranchManager Rejected">
                BranchManager Rejected
              </option>
            </select>
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Card Type</th>
              <th>Application Date</th>
              <th>Annual Income</th>
              <th>Requested Credit Limit</th>
              <th>Employment Status</th>
              <th>Application Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {paginatedCreditCardRequests.length ? (
            <tbody>
              {paginatedCreditCardRequests.map((request, index) => (
                <React.Fragment key={request.creditcardApplicationId}>
                  <tr>
                    <td>{request.User?.Username}</td>
                    <td>{request.CreditCard?.CardType}</td>
                    <td>
                      {new Date(request.ApplicationDate).toLocaleDateString()}
                    </td>
                    <td>{request.AnnualIncome}</td>
                    <td>${request.RequestedCreditLimit}</td>
                    <td>${request.EmploymentStatus}</td>
                    <td>{request.ApplicationStatus}</td>
                    <td>
                      {request.ApplicationStatus === "Pending" && (
                        <>
                          <button
                            id="greenButton"
                            onClick={() => handleApprove(request)}>
                            Approve
                          </button>
                          <button
                            id="redButton"
                            onClick={() => handleReject(request)}>
                            Reject
                          </button>
                        </>
                      )}
                      {request.ApplicationStatus ===
                        "Credit Card Officer Rejected" && (
                        <button
                          id="greenButton"
                          onClick={() => handleApprove(request)}>
                          Approve
                        </button>
                      )}
                      {request.ApplicationStatus ===
                        "Credit Card Officer Approved" && (
                        <button
                          id="redButton"
                          onClick={() => handleReject(request)}>
                          Reject
                        </button>
                      )}
                      {request.AccountHolder && request.AccountNumber && (
                        <button
                          id="disbursementButton"
                          onClick={() =>
                            handleCreditCardDisbursement(
                              request.creditCardApplicationId
                            )
                          }
                          disabled={
                            request.ApplicationStatus ===
                              "BranchManager Approved" ||
                            request.ApplicationStatus ===
                              "BranchManager Rejected"
                          }
                          style={{
                            cursor:
                              request.ApplicationStatus ===
                                "BranchManager Approved" ||
                              request.ApplicationStatus ===
                                "BranchManager Rejected"
                                ? "not-allowed"
                                : "pointer",
                            opacity:
                              request.ApplicationStatus ===
                                "BranchManager Approved" ||
                              request.ApplicationStatus ===
                                "BranchManager Rejected"
                                ? 0.6
                                : 1,
                          }}>
                          Add Credit Card Disbursement
                        </button>
                      )}
                      {/* <button onClick={() => handleRowExpand(index)}>
                        Show More
                      </button> */}
                    </td>
                  </tr>
                  {showModal && expandedRow === index && (
                    <CreditCardDetailsModal
                    creditcard={selectedCreditCard}
                      onClose={() => setShowModal(false)}
                    />
                  )}
                </React.Fragment>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8} className="no-records-cell">
                  Oops! No records Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {filteredCreditCardRequests.length > 0 && (
          <div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardRequest;
