// CreditCardDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreditCardDetails.css';
import { Link } from 'react-router-dom';

function CreditCardDetails() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const email = localStorage.getItem('email');

    useEffect(() => {
        const generateCardNumber = () => {
            let number = '';
            for (let i = 0; i < 16; i++) {
                number += Math.floor(Math.random() * 10);
            }
            setCardNumber(number);
        };

        const generateExpiryDate = () => {
            const futureYear = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
            const futureMonth = Math.floor(Math.random() * 12) + 1;
            const formattedMonth = String(futureMonth).padStart(2, '0');
            setExpiryDate(`${formattedMonth}/${String(futureYear).slice(-2)}`);
        };

        const generateCvv = () => {
            let cvv = '';
            for (let i = 0; i < 3; i++) {
                cvv += Math.floor(Math.random() * 10);
            }
            setCvv(cvv);
        };

        // Fetch user data (including name) and generate random credit card details
        const fetchDataAndGenerateDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${email}`);
                if (response.data && response.data.name) {
                    setCardHolderName(response.data.name);
                }

                generateCardNumber();
                generateExpiryDate();
                generateCvv();


            } catch (error) {
                console.error("Error fetching user data or generating details:", error);
                setMessage('Error initializing form. Please try again.');
            } finally {
                setLoading(false);
            }
        };


        fetchDataAndGenerateDetails();
    }, [email]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8000/credit-card', {
                email,
                cardNumber,
                expiryDate,
                cvv,
                cardHolderName,
            });

            setMessage('Credit card details saved successfully!');
            // Clear form fields or redirect after successful submission if needed
        } catch (error) {
            setMessage('Error saving credit card details. Please try again.');
            console.error("Error submitting form:", error);
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
        <div className="credit-card-container">
            <h2>Credit Card Details</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            readOnly
                        />
                    </div>
                    {/* ... other input fields */}


                    <div> {/* Cardholder Name input */}
                        <label htmlFor="cardHolderName">Cardholder Name:</label>
                        <input
                            type="text"
                            id="cardHolderName"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Save</button>

                </form>
            )}

            {message && <p>{message}</p>}
        </div>
        </>
    );
}

export default CreditCardDetails;