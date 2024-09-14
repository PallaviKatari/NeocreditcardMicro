
import React, { useState } from "react";
import "./CreditCardsApproval.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import BranchManagerNavbar from "./BranchManagerNavbar";

const CreditCardsApproval = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState("All"); // Added state for status filter
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

  const fetchCreditCardById = async (creditCardId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/creditcards/${creditCardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        console.error("Error fetching loan data:", res);
        return null;
      }
    } catch (error) {
      console.error("Error fetching loan data:", error);
      return null;
    }
  };

  const updateCreditCardStatus = async (creditCardId, status) => {
    const creditCardData = await fetchCreditCardById(creditCardId);
    if (creditCardData) {
      creditCardData.Status = status; // Update the status in the loan data

      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/creditcards/${creditCardId}`,
          creditCardData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          refetch(); // Refresh data after status update
        } else {
          console.error("Error updating creditcards status:", response);
        }
      } catch (error) {
        console.error("Error updating creditcards status:", error);
      }
    }
  };

  const { data, status, refetch } = useQuery("availableLoans", fetchAvailableCreditCards);

  React.useEffect(() => {
    if (data) {
      updateAvailableCreditCards(data);
    }
  }, [data]);

  const filterCreditCards = (creditcards, search) => {
    const searchLower = search.toLowerCase();
    return creditcards.filter(
      (creditcard) =>
        (statusFilter === "All" || creditcard.Status === statusFilter) &&
        (creditcard.CardType.toLowerCase().includes(searchLower) ||
        creditcard.CreditLimit.toLowerCase().includes(searchLower))
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value); // Update the status filter
  };

  return (
    <div id="parent">
      <BranchManagerNavbar />
      <div id="loanHomeBody">
        <h1>Credit Card</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <label id='filter'>
          Filter by Status:
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          </label>
        </div>

        <table className="loan-table">
          <thead>
            <tr>
              <th>Card Type</th>
              <th>CreditLimit</th>
              <th>
                <div id="interestrate">Interest Rate</div>
                <div>
                  <button className="sortButtons" onClick={() => toggleSort(1)}>
                    ⬆️
                  </button>
                  <button
                    className="sortButtons"
                    onClick={() => toggleSort(-1)}
                  >
                    ⬇️
                  </button>
                </div>
              </th>
              <th>AnnualFee</th>
              <th>MinimumPaymentPercentage</th>
              <th>CashAdvanceFee</th>
              <th>GracePeriodDays</th>
              <th>LatePaymentFee</th>
              <th>Status</th>
              <th>ExpiryDate</th>
              <th>IssuingBank</th>
              <th>CardholderName</th>
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
          {status === "success" && filterCreditCards(availableCreditCards, searchValue).length ? (
            <tbody>
              {filterCreditCards(availableCreditCards, searchValue)
                .slice((page - 1) * limit, page * limit)
                .map((creditcard) => (
                  <tr key={creditcard.CreditCardId}>
                    <td>{creditcard.CardType}</td>
                    <td>{creditcard.CreditLimit}</td>
                    <td>{creditcard.InterestRate}</td>
                    <td>{creditcard.AnnualFee}</td>
                    <td>{creditcard.MinimumPaymentPercentage}</td>
                    <td>{creditcard.CashAdvanceFee}</td>
                    <td>{creditcard.GracePeriodDays}</td>
                    <td>{creditcard.LatePaymentFee}</td>
                    <td>{creditcard.Status}</td>
                    <td>{creditcard.ExpiryDate}</td>
                    <td>{creditcard.IssuingBank}</td>
                    <td>{creditcard.CardholderName}</td>
                    <td>
                      {creditcard.Status === "Approved" ? (
                        <button
                          className="redButton"
                          onClick={() => updateCreditCardStatus(creditcard.CreditCardId, "Rejected")}
                        >
                          Reject
                        </button>
                      ) : creditcard.Status === "Rejected" ? (
                        <button
                          className="greenButton"
                          onClick={() => updateCreditCardStatus(creditcard.CreditCardId, "Approved")}
                        >
                          Approve
                        </button>
                      ) : (
                        <>
                          <button
                            className="greenButton"
                            onClick={() => updateCreditCardStatus(creditcard.CreditCardId, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="redButton"
                            onClick={() => updateCreditCardStatus(creditcard.CreditCardId, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
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
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewloanbutton"
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardsApproval;

