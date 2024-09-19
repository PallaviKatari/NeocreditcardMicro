import React, { useState } from "react";
import "./ViewCreditCardDisbursement.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import creditcardManagerNavbar from "./CreditCardManagerNavbar";

const ViewCreditCardDisbursement = () => {
  const navigate = useNavigate();
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showCreditCardDetailsModal, setShowCreditCardDetailsModal] =
    useState(false);
  const [selectedDisbursement, setSelectedDisbursement] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [maxRecords, setMaxRecords] = useState(1);

  const totalPages = Math.ceil(maxRecords / limit);

  const [availableDisbursements, setAvailableDisbursements] = useState([]);
  const updateAvailableDisbursements = (newDisbursements) => {
    setAvailableDisbursements(newDisbursements);
    setMaxRecords(newDisbursements.length);
  };

  const toggleSort = (order) => {
    setSortValue(order);

    const sortedDisbursements = [...availableDisbursements];
    sortedDisbursements.sort((a, b) => {
      if (order === 1) {
        return new Date(a.DisbursementDate) - new Date(b.DisbursementDate);
      } else if (order === -1) {
        return new Date(b.DisbursementDate) - new Date(a.DisbursementDate);
      }
      return 0;
    });

    updateAvailableDisbursements(sortedDisbursements);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fetchAvailableDisbursements = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/creditcarddisbursements`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        return res.data;
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const { data, status, refetch } = useQuery(
    "availableDisbursements",
    fetchAvailableDisbursements
  );

  React.useEffect(() => {
    if (data) {
      updateAvailableDisbursements(data);
    }
  }, [data]);

  const filterDisbursements = (disbursements, search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return disbursements;
    return disbursements.filter(
      (disbursement) =>
        disbursement.DisbursementMethod.toLowerCase().includes(searchLower) ||
        disbursement.Remarks.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const openUserDetailsModal = (disbursement) => {
    setSelectedDisbursement(disbursement);
    setShowUserDetailsModal(true);
  };

  const openCreditCardDetailsModal = (disbursement) => {
    setSelectedDisbursement(disbursement);
    setShowCreditCardDetailsModal(true);
  };

  const closeUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const closeCreditCardDetailsModal = () => {
    setShowCreditCardDetailsModal(false);
  };

  const handleEditClick = (
    creditCardDisbursementId,
    creditCardApplicationId
  ) => {
    navigate(
      `/creditcardDisbursementForm/${creditCardApplicationId}/${creditCardDisbursementId}`
    );
  };

  return (
    <div id="parent">
      <creditcardManagerNavbar />
      <div id="creditcardDisbursementBody">
        <h1>CreditCard Disbursements</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <table className="creditcard-disbursement-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Card Type</th>
              <th>Disbursement Date</th>
              <th>Credit Limit</th>
              <th>Disbursement Method</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          {status === "loading" && (
            <tbody>
              <tr>
                <td colSpan={8}>Loading...</td>
              </tr>
            </tbody>
          )}
          {status === "error" && (
            <tbody>
              <tr>
                <td colSpan={8}>Error loading data</td>
              </tr>
            </tbody>
          )}
          {status === "success" &&
          filterDisbursements(availableDisbursements, searchValue).length ? (
            <tbody>
              {filterDisbursements(availableDisbursements, searchValue)
                .slice((page - 1) * limit, page * limit)
                .map((disbursement) => (
                  <tr key={disbursement.creditCardDisbursementIdDisbursementId}>
                    <td>{disbursement.CreditCardApplication.User.Username}</td>
                    <td>
                      {disbursement.CreditCardApplication.CreditCard.CardType}
                    </td>
                    <td>
                      {new Date(
                        disbursement.DisbursementDate
                      ).toLocaleDateString()}
                    </td>
                    <td>{disbursement.CreditLimit}</td>
                    <td>{disbursement.DisbursementMethod}</td>
                    <td>{disbursement.Status}</td>
                    <td>{disbursement.Remarks}</td>
                    <td>
                      <button
                        className="greenButton"
                        onClick={() =>
                          handleEditClick(
                            disbursement.creditCardDisbursementId,
                            disbursement.creditCardApplicationId
                          )
                        }
                        disabled={disbursement.Status !== "Pending"}
                        style={{
                          //   backgroundColor: disbursement.Status !== "Pending" ? "grey" : "initial",
                          cursor:
                            disbursement.Status !== "Pending"
                              ? "not-allowed"
                              : "pointer",
                        }}>
                        Edit
                      </button>
                      <button
                        className="viewuserdetailsbutton"
                        onClick={() => openUserDetailsModal(disbursement)}>
                        Show User Details
                      </button>
                      <button
                        className="viewcreditcarddetailsbutton"
                        onClick={() =>
                          openCreditCardDetailsModal(disbursement)
                        }>
                        Show Credit Card Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            status === "success" && (
              <tbody>
                <tr>
                  <td colSpan={8} className="no-records-cell">
                    Oops! No records Found
                  </td>
                </tr>
              </tbody>
            )
          )}
        </table>
        {filterDisbursements(availableDisbursements, searchValue).length >
          0 && (
          <div>
            <button
              className="viewcreditcardbutton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewcreditcardbutton"
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>

      {showUserDetailsModal && selectedDisbursement && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong>{" "}
              {selectedDisbursement.CreditCardApplication.User.Username}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {selectedDisbursement.CreditCardApplication.User.Email}
            </p>
            <p>
              <strong>Mobile Number:</strong>{" "}
              {selectedDisbursement.CreditCardApplication.User.MobileNumber}
            </p>
            <button className="close-modal" onClick={closeUserDetailsModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {showCreditCardDetailsModal && selectedDisbursement && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>CreditCard Details</h2>
            <p>
              <strong>Card Type:</strong>{" "}
              {selectedDisbursement.CreditCardApplication.CreditCard.CardType}
            </p>
            <p>
              <strong>Interest Rate:</strong>{" "}
              {
                selectedDisbursement.CreditCardApplication.CreditCard
                  .InterestRate
              }
              %
            </p>
            <p>
              <strong>Max Amount:</strong> $
              {selectedDisbursement.CreditCardApplication.CreditCard.AnnualFee}
            </p>
            <p>
              <strong>Min Amount:</strong> $
              {
                selectedDisbursement.CreditCardApplication.CreditCard
                  .MinimumPaymentPercentage
              }
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {
                selectedDisbursement.CreditCardApplication.CreditCard
                  .CashAdvanceFee
              }
            </p>
            <p>
              <strong>Processing Fee:</strong> $
              {
                selectedDisbursement.CreditCardApplication.CreditCard
                  .LatePaymentFee
              }
            </p>
            <p>
              <strong>Grace Period:</strong>{" "}
              {
                selectedDisbursement.CreditCardApplication.CreditCard
                  .GracePeriodDays
              }{" "}
              days
            </p>
            <p>
              <strong>Late Payment Fee:</strong> $
              {
                selectedDisbursement.CreditCardApplication.CreditCard
                  .LatePaymentFee
              }
            </p>
            <button
              className="close-modal"
              onClick={closeCreditCardDetailsModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCreditCardDisbursement;
