import React, { useState } from "react";
import axios from "axios";
import "./signup1.css"; 
import { Link } from 'react-router-dom';

function Signup() {
    // State variables to store form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [balance, setBalance] = useState("");
    const [accountType, setAccountType] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signup", {
                email,
                password,
                name,
                fatherName,
                motherName,
                age,
                dob,
                balance,
                accountType,
                gender
            });

            if (response.data === "exist") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                alert("Account created successfully");
            } else {
                alert("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("There was an error creating the account:", error);
            alert("Failed to create account. Please check your details.");
        }
    };

    return (
        <>
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Father's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
                <input type="text" placeholder="Mother's Name" value={motherName} onChange={(e) => setMotherName(e.target.value)} required />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
                <input type="number" placeholder="Balance Amount" value={balance} onChange={(e) => setBalance(e.target.value)} required />
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
                    <option value="">Select Account Type</option>
                    <option value="Savings">Savings</option>
                    <option value="Checking">Checking</option>
                    <option value="Business">Business</option>
                </select>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit">Create Account</button>
            </form>
        </div>
        <div><Link to="/">CLICK HERE TO LOGIN </Link>
            </div>
        </>
    );
}

export default Signup;
