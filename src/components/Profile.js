
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom'; 
import './Profile.css'; 


function Profile() {
    const { email } = useParams(); 
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {

        const fetchUserData = async () => {
          try {
                const storedEmail = localStorage.getItem('email');
                if (!storedEmail) {
                    
                    setError("Email not found in local storage. Please login.");
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`http://localhost:8000/savings/${storedEmail}`);
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching user data. Please try again later.");
                setLoading(false);
                console.error(err);
            }
        };
    
        fetchUserData();
    }, []);



    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>User not found.</div>;
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
<div className="profile-container">
    <h2 className="profile-header">User Profile</h2>

    <div className="profile-details">
        <div className="profile-info">
            <p><strong>Name:</strong> {userData?.name}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Father's Name:</strong> {userData?.fatherName}</p>
            <p><strong>Mother's Name:</strong> {userData?.motherName}</p>
            <p><strong>Age:</strong> {userData?.age}</p>
            <p><strong>Date of Birth:</strong> {userData?.dob}</p>
        </div>


        <div className="balance-box">
            <h3>Account Balance</h3>
            <p className="balance-amount">₹ {userData?.balance.toLocaleString()}</p>
        </div>
    </div>
</div>
        
        
        </>
    );
}


export default Profile;