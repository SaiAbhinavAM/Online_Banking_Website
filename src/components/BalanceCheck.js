
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BalanceCheck.css'; 
import { Link } from 'react-router-dom';

function BalanceCheck() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = localStorage.getItem('email');


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`/balance/${email}`); 
                setBalance(response.data.balance); 


            } catch (error) {
                console.error("Error:", error);
            
            } finally {
                setLoading(false);
            }
        };



        if (email) {
            fetchBalance();
        } else {
            setError("User not logged in.");
            setLoading(false);

        }


    }, [email]);


    if (loading) {
        return <div>Loading balance...</div>;
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

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
        <div className="balance-check-container">
            <h2>Your Account Balance</h2>
            <p>Current Balance: ${balance}</p>


        </div>
        </>
    );

}


export default BalanceCheck;