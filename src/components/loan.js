import React, { useState } from 'react';
import './loan.css';
import { Link } from 'react-router-dom';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    purpose: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8001/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Loan application submitted successfully!');
        setFormData({
          fullName: '',
          phoneNumber: '',
          loanAmount: '',
          interestRate: '',
          loanTerm: '',
          purpose: '',
        });
      } else {
        alert('Error submitting application');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <div className="main-container">
            <div className="sidebar">
                <Link to="/home">Home </Link>
                <Link to="/loans">Loan </Link>
                <Link to="/balance">Balance </Link>
                <Link to="/insurance">Insurance </Link>
                <Link to="/transfer">Payment tranfer </Link>
                <Link to="/transaction">Deposit </Link>
                <Link to="/profile">Profile </Link>

            </div>
            </div>
    <div className="loan-application-form">
        
      <h1>DIGIBANK</h1>
      <h2>Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Loan Amount</label>
            <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} placeholder="Enter loan amount" required />
          </div>
          <div className="form-group">
            <label>Interest Rate</label>
            <input type="text" name="interestRate" value={formData.interestRate} onChange={handleChange} placeholder="Enter interest rate" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Loan Term</label>
            <input type="text" name="loanTerm" value={formData.loanTerm} onChange={handleChange} placeholder="Enter loan term" required />
          </div>
          <div className="form-group">
            <label>Purpose of Loan</label>
            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Enter loan purpose" required />
          </div>
        </div>
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
    </>
  );
};

export default LoanApplicationForm;