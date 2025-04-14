
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvestmentPlans.css';
import { Link } from 'react-router-dom';

function InvestmentPlans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestmentPlans = async () => {
            try {
                const response = await axios.get('/investment-plans'); 
                setPlans(response.data);
            } catch (error) {
                console.error("Error fetching investment plans:", error);
                setError("Failed to load investment plans.");
            } finally {
                setLoading(false);
            }
        };
        fetchInvestmentPlans();
    }, []);

    if (loading) {
        return <div className="loading">Loading investment plans...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <>
            <div className="main-container">
                <div className="sidebar">
                    <Link to="/home">Home</Link>
                    <Link to="/loans">Loan</Link>
                    <Link to="/balance">Balance</Link>
                    <Link to="/insurance">Insurance</Link>
                    <Link to="/transfer">Payment Transfer</Link>
                    <Link to="/transaction">Deposit </Link>
                <Link to="/profile">Profile </Link>
                </div>

                <div className="investment-plans-container">
                    <h2>Explore Our Investment Plans</h2>
                    <p className="intro-text">
                        Choose from a variety of investment plans tailored to meet your financial goals.
                        Whether you're looking for high-risk, high-reward options or safe, stable investments,
                        we have something for everyone.
                    </p>
                    <div className="plans-grid">
                        {plans.map((plan) => (
                            <div key={plan.id} className="investment-plan">
                                <h3>{plan.name}</h3>
                                <p style={{ color: '#0000ff' }}><strong>Minimum Investment:</strong> ${plan.minInvestment}</p>
                                <p style={{ color: '#0000ff' }}><strong>Expected Returns:</strong> {plan.returns}%</p>
                                <p style={{ color: '#0000ff' }}><strong>Risk Level:</strong> {plan.riskLevel}</p>
                                <p style={{ color: '#0000ff' }}><strong>Duration:</strong> {plan.duration} years</p>
                                <p style={{ color: '#0000ff' }}><strong>Investment Type:</strong> {plan.type}</p>
                                
                                <button className="invest-button">Invest Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InvestmentPlans;
