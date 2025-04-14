// Transaction.js (Frontend - React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css'; // Import your CSS
import { Link } from 'react-router-dom';


function Transaction() {
    const [email, setEmail] = useState(localStorage.getItem('email')); // Get email from local storage
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('deposit'); // Default to deposit
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(null);


     useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/savings/${email}`);
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
    
        if (email) { // Check if email exists before fetching
            fetchBalance();
        }
    }, [email]);


    const handleTransaction = async () => {
        try {
            const response = await axios.post('http://localhost:8000/transaction', {
                email,
                amount: parseFloat(amount), // Ensure amount is a number
                transactionType,

            });
            setMessage(response.data.message);
             setBalance(response.data.balance);  // Update displayed balance after transaction
            setAmount(''); // Clear input after successful transaction

        } catch (error) {
            setMessage('Error processing transaction. Please try again.');
            console.error("Error:", error);
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
        <div className="transaction-container">
             {balance !== null && (<p>Current Balance: {balance}</p>)} 
            <h2>Make a Transaction</h2>
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <label htmlFor="transactionType">Transaction Type:</label>
            <select
                id="transactionType"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
            >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
            </select>

            <button onClick={handleTransaction}>Submit</button>

            {message && <p>{message}</p>} {/* Display success/error message */}

        </div>
        </>
    );
}

export default Transaction;