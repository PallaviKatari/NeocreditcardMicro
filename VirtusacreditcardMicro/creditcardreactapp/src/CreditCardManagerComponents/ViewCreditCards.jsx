import React, { useState } from "react";
import "./ViewCreditCards.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import CreditCardManagerNavbar from "./CreditCardManagerNavbar";

const ViewCreditCards = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [creditCardToDelete, setCreditCardToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [maxRecords, setMaxRecords] = useState(1);

  const totalPages = Math.ceil(maxRecords / limit);

  const [availableCreditCards, setAvailableCreditCards] = useState([]);
  const updateAvailableCreditCards = (newCreditCards) => {
    setAvailableCreditCards(newCreditCards);
    setMaxRecords(newCreditCards.length);
  };

  const toggleSort = (order) => {
    setSortValue(order);

    const sortedCreditCards = [...availableCreditCards];
    sortedCreditCards.sort((a, b) => {
      if (order === 1) {
        return a.InterestRate - b.InterestRate;
      } else if (order === -1) {
        return b.InterestRate - a.InterestRate;
      }
      return 0;
    });

    updateAvailableCreditCards(sortedCreditCards);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDeleteClick = (creditCardId) => {
    setCreditCardToDelete(creditCardId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (creditCardToDelete) {
        const response = await axios.delete(
          `${API_BASE_URL}/api/creditcards/${creditCardToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          refetch();
        } else {
          console.log("Error");
        }
        closeDeletePopup();
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const closeDeletePopup = () => {
    setCreditCardToDelete(null);
    setShowDeletePopup(false);
  };

  const fetchAvailableCreditCards = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/creditcards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
    "availableCreditCards",
    fetchAvailableCreditCards
  );

  React.useEffect(() => {
    if (data) {
      updateAvailableCreditCards(data);
    }
  }, [data]);

  const filterCreditCards = (creditCards, search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return creditCards;
    return creditCards.filter(
      (creditCard) =>
        creditCard.CardType.toLowerCase().includes(searchLower) ||
        creditCard.CreditLimit.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div id="parent">
      <CreditCardManagerNavbar />
      <div id="loanHomeBody" className={showDeletePopup ? "blur" : ""}>
        <h1>Credit Cards</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <table className="loan-table">
          <thead>
            <tr>
              <th>Card Type</th>
              <th>Credit Limit</th>
              <th>
                <div id="interestrate">Interest Rate</div>
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
              <th>AnnualFee</th>
              <th>Minimum Payment Percentage</th>
              <th>Cash Advance Fee</th>
              <th>Grace Period Days</th>
              <th>Late Payment Fee</th>
              <th>Status</th>
              <th>Expiry Date</th>
              <th>Issuing Bank</th>
              <th>Cardholder Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {status === "loading" && (
            <tbody>
              <tr>
                <td colSpan={13}>Loading...</td>
              </tr>
            </tbody>
          )}
          {status === "error" && (
            <tbody>
              <tr>
                <td colSpan={13}>Error loading data</td>
              </tr>
            </tbody>
          )}
          {status === "success" &&
          filterCreditCards(availableCreditCards, searchValue).length ? (
            <tbody>
              {filterCreditCards(availableCreditCards, searchValue)
                .slice((page - 1) * limit, page * limit)
                .map((creditCard) => (
                  <tr key={creditCard.CreditCardId}>
                    <td>{creditCard.CardType}</td>
                    <td>{creditCard.CreditLimit}</td>
                    <td>{creditCard.InterestRate}</td>
                    <td>{creditCard.AnnualFee}%</td>
                    <td>{creditCard.MinimumPaymentPercentage}</td>
                    <td>{creditCard.CashAdvanceFee}</td>
                    <td>{creditCard.GracePeriodDays}</td>
                    <td>{creditCard.LatePaymentFee}</td>
                    <td>${creditCard.Status}</td>
                    <td>{creditCard.ExpiryDate}</td>
                    <td>{creditCard.IssuingBank}</td>
                    <td>${creditCard.CardholderName}</td>
                    <td>
                      <button
                        className="viewloanbutton"
                        id="greenButton"
                        onClick={() =>
                          navigate("/newloan/" + creditCard.creditCardId)
                        }
                        disabled={creditCard.Status !== "Pending"}
                        style={{
                          backgroundColor:
                            creditCard.Status !== "Pending"
                              ? "grey"
                              : "initial",
                          cursor:
                            creditCard.Status !== "Pending"
                              ? "not-allowed"
                              : "pointer",
                        }}>
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick(creditCard.creditCardId)
                        }
                        id="deleteButton"
                        disabled={creditCard.Status !== "Pending"}
                        style={{
                          backgroundColor:
                            creditCard.Status !== "Pending"
                              ? "grey"
                              : "initial",
                          cursor:
                            creditCard.Status !== "Pending"
                              ? "not-allowed"
                              : "pointer",
                        }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            status === "success" && (
              <tbody>
                <tr>
                  <td colSpan={13} className="no-records-cell">
                    Oops! No records Found
                  </td>
                </tr>
              </tbody>
            )
          )}
        </table>
        {filterCreditCards(availableCreditCards, searchValue).length > 0 && (
          <div>
            <button
              className="viewloanbutton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewloanbutton"
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
    </div>
  );
};

export default ViewCreditCards;
