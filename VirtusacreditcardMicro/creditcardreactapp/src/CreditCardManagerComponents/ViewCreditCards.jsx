import React, { useState, useEffect } from "react";
import "./ViewCreditCards.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import CreditCardManagerNavbar from "./CreditCardManagerNavbar";

const ViewCreditCards = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [creditCardToDelete, setCreditCardToDelete] = useState(null);
  const [creditCardToEdit, setCreditCardToEdit] = useState(null);
  const [formData, setFormData] = useState({
    CardType: "",
    CreditLimit: 0,
    InterestRate: 0,
    AnnualFee: 0,
    MinimumPaymentPercentage: 0,
    CashAdvanceFee: 0,
    GracePeriodDays: 0,
    LatePaymentFee: 0,
    Status: "Pending",
    ExpiryDate: "",
    IssuingBank: "",
    CardholderName: "",
  });
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
         // refetch();
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

  const handleEditClick = (creditCard) => {
    setFormData({
      CardType: creditCard.CardType,
      CreditLimit: creditCard.CreditLimit,
      InterestRate: creditCard.InterestRate,
      AnnualFee: creditCard.AnnualFee,
      MinimumPaymentPercentage: creditCard.MinimumPaymentPercentage,
      CashAdvanceFee: creditCard.CashAdvanceFee,
      GracePeriodDays: creditCard.GracePeriodDays,
      LatePaymentFee: creditCard.LatePaymentFee,
      Status: creditCard.Status,
      ExpiryDate: creditCard.ExpiryDate,
      IssuingBank: creditCard.IssuingBank,
      CardholderName: creditCard.CardholderName,
    });
    setCreditCardToEdit(creditCard.CreditCardId);
    setShowEditPopup(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCreditCard = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/creditcards/${creditCardToEdit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
       // refetch();
        closeEditPopup();
      }
    } catch (error) {
      console.log("Error updating credit card:", error);
    }
  };

  const closeEditPopup = () => {
    setCreditCardToEdit(null);
    setShowEditPopup(false);
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

  useEffect(() => {
    fetchAvailableCreditCards().then((data) => {
      updateAvailableCreditCards(data);
    });
  }, []);

  const filterCreditCards = (creditCards, search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return creditCards;
    return creditCards.filter(
      (creditCard) =>
        creditCard.CardType.toLowerCase().includes(searchLower) ||
        creditCard.CreditLimit.toString().toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div id="parent">
      <CreditCardManagerNavbar />
      <div id="creditcardHomeBody" className={showDeletePopup || showEditPopup ? "blur" : ""}>
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

        <table className="creditcard-table">
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
                  <button className="sortButtons" onClick={() => toggleSort(-1)}>
                    ⬇️
                  </button>
                </div>
              </th>
              <th>Annual Fee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCreditCards(availableCreditCards, searchValue)
              .slice((page - 1) * limit, page * limit)
              .map((creditCard) => (
                <tr key={creditCard.CreditCardId}>
                  <td>{creditCard.CardType}</td>
                  <td>{creditCard.CreditLimit}</td>
                  <td>{creditCard.InterestRate}%</td>
                  <td>{creditCard.AnnualFee}</td>
                  <td>{creditCard.Status}</td>
                  <td>
                    <button
                      className="editButton"
                      onClick={() => handleEditClick(creditCard)}>
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteClick(creditCard.CreditCardId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filterCreditCards(availableCreditCards, searchValue).length > 0 && (
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

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={closeDeletePopup}>Cancel</button>
        </div>
      )}

      {/* Edit Popup */}
      {showEditPopup && (
        <div className="edit-popup">
          <h3>Edit Credit Card</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Card Type:</label>
            <input
              type="text"
              name="CardType"
              value={formData.CardType}
              onChange={handleEditChange}
            />
            <label>Credit Limit:</label>
            <input
              type="number"
              name="CreditLimit"
              value={formData.CreditLimit}
              onChange={handleEditChange}
            />
            <label>Interest Rate:</label>
            <input
              type="number"
              name="InterestRate"
              value={formData.InterestRate}
              onChange={handleEditChange}
            />
            <label>Annual Fee:</label>
            <input
              type="number"
              name="AnnualFee"
              value={formData.AnnualFee}
              onChange={handleEditChange}
            />
            <label>Minimum Payment Percentage:</label>
            <input
              type="number"
              name="MinimumPaymentPercentage"
              value={formData.MinimumPaymentPercentage}
              onChange={handleEditChange}
            />
            <label>Cash Advance Fee:</label>
            <input
              type="number"
              name="CashAdvanceFee"
              value={formData.CashAdvanceFee}
              onChange={handleEditChange}
            />
            <label>Grace Period (Days):</label>
            <input
              type="number"
              name="GracePeriodDays"
              value={formData.GracePeriodDays}
              onChange={handleEditChange}
            />
            <label>Late Payment Fee:</label>
            <input
              type="number"
              name="LatePaymentFee"
              value={formData.LatePaymentFee}
              onChange={handleEditChange}
            />
            <label>Status:</label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleEditChange}>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
            <label>Expiry Date:</label>
            <input
              type="date"
              name="ExpiryDate"
              value={formData.ExpiryDate}
              onChange={handleEditChange}
            />
            <label>Issuing Bank:</label>
            <input
              type="text"
              name="IssuingBank"
              value={formData.IssuingBank}
              onChange={handleEditChange}
            />
            <label>Cardholder Name:</label>
            <input
              type="text"
              name="CardholderName"
              value={formData.CardholderName}
              onChange={handleEditChange}
            />
            <div>
              <button onClick={handleUpdateCreditCard}>Save</button>
              <button onClick={closeEditPopup}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewCreditCards;
