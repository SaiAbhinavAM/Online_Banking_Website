
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Insurance.css'; 
import { Link } from 'react-router-dom';

function Insurance() {
    const [insurancePlans, setInsurancePlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        const fetchInsurancePlans = async () => {
            try {
                const response = await axios.get('/insurance-plans'); 
                setInsurancePlans(response.data);
            } catch (err) {
                console.error("Error fetching insurance plans:", err);
                setError("Failed to load insurance plans.");
            } finally {
                setLoading(false);
            }
        };

        fetchInsurancePlans();
    }, []);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handlePurchase = async () => {
        if (!selectedPlan) {
            alert('Please select an insurance plan.');
            return;
        }

        console.log("Purchasing plan:", selectedPlan);
        alert(`Thank you for choosing the ${selectedPlan.name} plan! (Simulated purchase)`);
    };

    if (loading) {
        return <div className="insurance-loading">Loading insurance plans...</div>;
    }

    if (error) {
        return <div className="insurance-error">Error: {error}</div>;
    }

    return (
        <>
            <div className="main-container">
                <div className="sidebar">
                    <Link to="/home">Home </Link>
                    <Link to="/loans">Loan </Link>
                    <Link to="/balance">Balance </Link>
                    <Link to="/insurance">Insurance </Link>
                    <Link to="/transfer">Payment Transfer </Link>
                    <Link to="/transaction">Deposit </Link>
                <Link to="/profile">Profile </Link>
                </div>
            </div>

            <div className="insurance-container">
                <h2>Our Insurance Plans</h2>
                <div className="insurance-plans">
                    {insurancePlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`insurance-plan ${selectedPlan && selectedPlan.id === plan.id ? 'selected' : ''}`}
                            onClick={() => handlePlanSelect(plan)}
                        >
                            <h3>{plan.name}</h3>
                            <p>Coverage: {plan.coverage}</p>
                            <p>Premium: ${plan.premium}</p>
                            <ul>
                                {plan.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {selectedPlan && (
                    <div className="selected-plan-details">
                        <h3>Selected Plan: {selectedPlan.name}</h3>
                        <button onClick={handlePurchase}>Purchase</button>
                    </div>
                )}

                <div className="info-box-container">
                    <div className="info-box">
                        <h3>Why Choose Our Plans?</h3>
                        <p>Our insurance plans offer comprehensive coverage, flexible premiums, and quick claim settlements to provide peace of mind and financial security.</p>
                    </div>
                    
                    

                    
                </div>
                <div className="info-box">
                        <h3>Tips for Choosing the Right Plan</h3>
                        <ul>
                            <li>Assess your coverage needs based on your lifestyle.</li>
                            <li>Compare the premiums and benefits of various plans.</li>
                            <li>Check the claim settlement ratio of the provider.</li>
                            <li>Consider plans with added riders for enhanced protection.</li>
                        </ul>
                    </div>
                <div className="info-box">
                        <h3>Frequently Asked Questions</h3>
                        <p><strong>Q:</strong> What is covered in these insurance plans?<br />
                           <strong>A:</strong> Our plans cover a range of medical expenses, hospitalization, and personal accidents.</p>
                        <p><strong>Q:</strong> How do I file a claim?<br />
                           <strong>A:</strong> You can file a claim online through our user portal or by contacting customer support.</p>
                    </div>
            </div>
        </>
    );
}

export default Insurance;
