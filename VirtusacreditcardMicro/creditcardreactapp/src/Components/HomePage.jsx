import React, { useEffect, useState } from "react";
import "./HomePage.css"; // Import your custom styles
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import CreditCardManagerNavbar from "../CreditCardManagerComponents/CreditCardManagerNavbar";
import BranchManagerNavbar from "../BranchManagerComponents/BranchManagerNavbar";
import CustomerNavbar from "../CustomerComponents/CustomerNavbar";

const HomePage = () => {
  const [userRole, setUserRole] = useState("");
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    console.log("userId in Homepage", userId);
  }, []);

  const renderNavbar = () => {
    console.log("Role in homepage", localStorage.getItem("userRole"));
    switch (userRole) {
      case "CreditCardOfficer":
        return <CreditCardManagerNavbar />;
      case "Customer":
        return <CustomerNavbar />;
      case "BranchManager":
        return <BranchManagerNavbar />;
      default:
        return null;
    }
  };

  return (
    <div className="wrapper">
      {renderNavbar()}
      <div className="coverimage">
        <LazyLoadImage
          effect="blurr"
          src={process.env.PUBLIC_URL + "/loancoverimage.jpg"}
          alt="Cover"
        />
        <div className="title">Credit Card Application</div>
      </div>

      <div className="content">
       
      </div>

      <div className="contact">
        <h2>Contact Us</h2>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
};

export default HomePage;
