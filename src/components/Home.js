import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function MainPage() {
  return (
    <div className="App">
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services">
          
          <Link to="/credit-cards" className="service-card">
            <span className="icon">💳</span>
            <h3>Credit Cards</h3>
            <p>Flexible credit card options with rewards and cashback offers.</p>
          </Link>
          <Link to="/investment-plans" className="service-card">
            <span className="icon">📈</span>
            <h3>Investment Plans</h3>
            <p>Strategic investment solutions to help you achieve your financial goals.</p>
          </Link>
          <Link to="/loans" className="service-card">
            <span className="icon">🏦</span>
            <h3>Loans</h3>
            <p>Personalized loan options to meet your financial needs.</p>
          </Link>
          <Link to="/transfer" className="service-card">
            <span className="icon">📱</span>
            <h3>Mobile Banking</h3>
            <p>Access your accounts anytime, anywhere with our mobile banking app.</p>
          </Link>
          <Link to="/insurance" className="service-card">
            <span className="icon">🛡️</span>
            <h3>Insurance</h3>
            <p>Comprehensive insurance plans to protect your future.</p>
          </Link>
          <Link to="/balance" className="service-card">
            <span className="icon">🔍</span>
            <h3>Balance checking</h3>
            <p>Stay updated with your account balance and transaction history.</p>
          </Link>
        </div>
      </section>

      <footer>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help Center</a>
        </div>
        <p>©️ 2024 Digibank all rights reserved</p>
      </footer>
    </div>
  );
}

export default MainPage;

