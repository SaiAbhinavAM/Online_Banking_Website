
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Money.css'; 
import { Link } from 'react-router-dom';

function Money() {
    const [senderEmail, setSenderEmail] = useState(localStorage.getItem('email'));
    const [recipientEmail, setRecipientEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [senderBalance, setSenderBalance] = useState(null);  


    useEffect(() => {
        const fetchSenderBalance = async () => {  
            if (senderEmail) {  
                try {
                    const response = await axios.get(`http://localhost:8000/savings/${senderEmail}`);
                    setSenderBalance(response.data.balance);
                } catch (error) {
                    console.error("Error fetching balance:", error);
                    setMessage('Error fetching balance. Please try again.');
                }
            }
        };

        fetchSenderBalance();  
    }, [senderEmail]);  




    const handleTransfer = async () => {
        try {
            if (parseFloat(amount) > senderBalance) {  
                setMessage("Insufficient funds");
                return;
            }
            const response = await axios.post('http://localhost:8000/transfer', {
                senderEmail,
                recipientEmail,
                amount: parseFloat(amount),
            });
            setMessage(response.data.message);
            setSenderBalance(response.data.senderBalance);
            setRecipientEmail('');  
            setAmount('');


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); 
            } else {
                setMessage('Error transferring money. Please try again.');
            }

            console.error("Transfer error:", error);
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

        <div className="money-container">
             <p>Your Balance: {senderBalance}</p> 
            <h2>Transfer Money</h2>
            <input
                type="email"
                placeholder="Recipient's Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button onClick={handleTransfer}>Transfer</button>
            {message && <p>{message}</p>}
        </div>
        </>
    );
}

export default Money;
