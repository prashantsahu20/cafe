import React, { useState } from "react";
import "../styles/PaymentPage.css";
import mastercard from "../images/mastercard.png";
import paytm from "../images/paytm.png";
import visa from "../images/visa.png";
import rupay from "../images/rupay.png";
import upi from "../images/upi.png";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h2 className="order-overview-title">ORDER OVERVIEW</h2>
      <h3 className="order-amount">₹ {totalAmount} </h3>

      <div className="payment-method">
        <h4 className="payment-method-title">Please Select a Payment Method</h4>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Credit / Debit Card
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          UPI
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery (COD)
        </label>
      </div>

      {paymentMethod === "card" && (
        <div className="card-form">
          <div className="form-group" id="first-name">
            <label>First Name</label>
            <input type="text" placeholder="John" />
          </div>
          <div className="form-group" id="last-name">
            <label>Last Name</label>
            <input type="text" placeholder="Doe" />
          </div>
          <div className="form-group" id="card-number">
            <label>Card Number</label>
            <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
          </div>
          <div className="form-row">
            <div className="form-group" id="valid-until">
              <label>Valid Until</label>
              <select>
                <option>Month</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <select>
                <option>Year</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
                <option>2031</option>
              </select>
            </div>
            <div className="form-group" id="cvv">
              <label>CVV</label>
              <input type="password" placeholder="XXX" />
            </div>
          </div>
          <div className="payment-icons">
            <img src={mastercard} alt="MasterCard" />
            <img src={paytm} alt="Paytm" />
            <img src={rupay} alt="RuPay" />
            <img src={visa} alt="Visa" />
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="upi-form">
          <div className="form-group" id="upi-id">
            <label>UPI ID</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="text" placeholder="example@upi" />
              <img className="upi" src={upi} alt="upi" />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="cod-info">
          <p>You have selected Cash on Delivery. Please prepare the exact amount at delivery.</p>
        </div>
      )}

      <div className="button-group">
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

      <SuccessModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default PaymentPage;

