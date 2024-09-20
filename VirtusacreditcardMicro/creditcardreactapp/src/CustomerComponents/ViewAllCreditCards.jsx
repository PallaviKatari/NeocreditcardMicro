import React, { useState, useEffect } from "react";
import "./ViewAllCreditCards.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreditCardInfo } from "../creditcardSlice";
import API_BASE_URL from "../apiConfig";
import CustomerNavbar from "./CustomerNavbar";

const ViewAllCreditCards = () => {
  const navigate = useNavigate();
  const [availableCreditCards, setAvailableCreditCards] = useState([]);
  const [filteredCreditCards, setFilteredCreditCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [appliedCreditCards, setAppliedCreditCards] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAppliedCreditCards();
    fetchData();
  }, [userId]); // Ensure that the effect runs whenever `userId` changes

  async function fetchAppliedCreditCards() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/creditcards/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Applied Credit Cards Response:", response);

      if (response.status === 200) {
        setAppliedCreditCards(response.data);
      }
    } catch (error) {
      console.log("Error fetching applied creditcards:", error);
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/creditcards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const approvedCreditCards = response.data.filter(
          (creditcard) => creditcard.Status === "Approved"
        );
        setAvailableCreditCards(approvedCreditCards);
        setFilteredCreditCards(approvedCreditCards);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/error");
    }
  }

  const totalPages = Math.ceil(filteredCreditCards.length / limit);

  const filterCreditCards = (search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return availableCreditCards;
    return availableCreditCards.filter((creditcard) =>
      creditcard.CardType.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    const filteredCreditCards = filterCreditCards(inputValue);
    setFilteredCreditCards(filteredCreditCards);
  };

  const toggleSort = (order) => {
    setSortValue(order);

    const sortedCreditCards = [...filteredCreditCards].sort((a, b) => {
      if (order === 1) {
        return a.InterestRate - b.InterestRate;
      } else if (order === -1) {
        return b.InterestRate - a.InterestRate;
      } else {
        return 0;
      }
    });

    setFilteredCreditCards(sortedCreditCards);
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleApplyClick = (creditcard) => {
    console.log("Credit Card to Apply:", creditcard);
    console.log("Applied Credit Cards:", appliedCreditCards);

    // Check if the credit card has already been applied
    const isCreditCardApplied = appliedCreditCards.some(
      (appliedCreditCard) =>
        appliedCreditCard.CreditCardId === creditcard.CreditCardId
    );

    if (isCreditCardApplied) {
      alert("CreditCard is already applied.");
    } else {
      // Set the CreditCardId in localStorage
      localStorage.setItem("CreditCardId", creditcard.CreditCardId);

      // Log a confirmation message
      console.log("Applied Credit Cards:", creditcard.CreditCardId);

      // Retrieve and log the value from localStorage to confirm it's stored correctly
      console.log("Stored CreditCardId:", localStorage.getItem("CreditCardId"));

      dispatch(
        setCreditCardInfo({
          CreditCardId: creditcard.CreditCardId,
          CardType: creditcard.CardType,
        })
      );
      navigate("/creditcardapplications");

      // Update the applied cards locally after the application
      setAppliedCreditCards((prev) => [...prev, creditcard]); // Add applied credit card to the list
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div id="creditcardHomeBody">
        <h1>Available Credit Cards</h1>

        <div>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <table className="creditcard-table">
          <thead>
            <tr>
              <th>Card Type</th>
              <th>CreditLimit</th>
              <th>
                <div id="interestrate">Interest Rate</div>
                <div>
                  <button
                    className="sortButtons"
                    role="ascending-button"
                    onClick={() => toggleSort(1)}>
                    ⬆️
                  </button>
                  <button
                    className="sortButtons"
                    role="descending-button"
                    onClick={() => toggleSort(-1)}>
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
          {filteredCreditCards.length ? (
            <tbody>
              {filteredCreditCards
                .slice((page - 1) * limit, page * limit)
                .map((creditcard) => (
                  <tr key={creditcard.CreditCardId}>
                    <td>{creditcard.CardType}</td>
                    <td>{creditcard.CreditLimit}</td>
                    <td>{creditcard.InterestRate}%</td>
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
                      {appliedCreditCards.some(
                        (appliedCreditCard) =>
                          appliedCreditCard.CreditCardId ===
                          creditcard.CreditCardId
                      ) ? (
                        "Applied Successfully"
                      ) : (
                        <button
                          className="viewallcreditcardsbutton"
                          id="greenButton"
                          onClick={() => handleApplyClick(creditcard)}>
                          Apply
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={12} className="no-records-cell">
                  Oops! No records Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {filteredCreditCards.length > 0 && (
          <div>
            <button
              className="viewallcreditcardsbutton"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="viewallcreditcardsbutton"
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllCreditCards;
