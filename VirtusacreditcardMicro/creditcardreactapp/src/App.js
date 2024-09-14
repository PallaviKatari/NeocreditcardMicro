import React from "react";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import CreditCardForm from "./CreditCardManagerComponents/CreditCardForm";
import SignupForm from "./Components/Signup";
import CreditCardRequest from "./CreditCardManagerComponents/CreditCardRequest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute"; // Import the PrivateRoute component
import { Navigate } from "react-router-dom";
import ViewAllCreditCards from "./CustomerComponents/ViewAllCreditCards";
import AppliedCreditCards from "./CustomerComponents/AppliedCreditCards";
import CreditCardApplicationForm from "./CustomerComponents/CreditCardApplicationForm";
import ErrorPage from "./Components/ErrorPage";
import ViewCreditCards from "./CreditCardManagerComponents/ViewCreditCards";
import ViewFeedback from "./CreditCardManagerComponents/ViewFeedback";
import BranchManagerViewFeedback from "./BranchManagerComponents/ViewFeedback";
import CreditCardDisbursementForm from "./CreditCardManagerComponents/CreditCardDisbursementForm";
import ViewLoanDisbursement from "./CreditCardManagerComponents/ViewCreditCardDisbursement";
import CreditCardApplicationApproval from "./BranchManagerComponents/CreditCardApplicationApproval";
import CreditCardsApproval from "./BranchManagerComponents/CreditCardsApproval";
import CustomerPostFeedback from "./CustomerComponents/CustomerPostFeedback";
import CustomerMyFeedback from "./CustomerComponents/CustomerMyFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignupForm />} />
        </Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {" "}
              <HomePage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/viewcreditcards"
          element={
            <PrivateRoute>
              {" "}
              <ViewCreditCards />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/newcreditcard/:creditcardId?"
          element={
            <PrivateRoute>
              {" "}
              <CreditCardForm />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/creditcardrequest"
          element={
            <PrivateRoute>
              {" "}
              <CreditCardRequest />{" "}
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/user/login" replace />} />
        <Route
          path="/availablecreditcard"
          element={
            <PrivateRoute>
              {" "}
              <ViewAllCreditCards />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/appliedcreditcard"
          element={
            <PrivateRoute>
              {" "}
              <AppliedCreditCards />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/creditcardapplications"
          element={
            <PrivateRoute>
              {" "}
              <CreditCardApplicationForm />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <ViewFeedback />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/branchmanagerfeedback"
          element={
            <PrivateRoute>
              <BranchManagerViewFeedback />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/userpostfeedback"
          element={
            <PrivateRoute>
              <CustomerPostFeedback />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/usermyfeedback"
          element={
            <PrivateRoute>
              <CustomerMyFeedback />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/creditcardsapprovel"
          element={
            <PrivateRoute>
              <CreditCardsApproval />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/creditcardDisbursementForm/:creditcardApplicationId?/:creditcardDisbursementId?"
          element={
            <PrivateRoute>
              {" "}
              <CreditCardDisbursementForm />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/viewcreditcarddisbursement"
          element={
            <PrivateRoute>
              <ViewLoanDisbursement />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/creditcardapplicationapprovel"
          element={
            <PrivateRoute>
              <CreditCardApplicationApproval />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
