// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Loan from "./components/loan"
//import Signup1 from "./components/signup1"
import In from "./components/Insurance"
import InvestmentPlans from './components/Investmentplans';
import Savings from "./savings"
import BalanceCheck from './components/BalanceCheck';
import Money from "./components/Money"
import CreditCardDetails from './components/CreditCardDetails';
import Transaction from './components/Transaction';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/loans" element={<Loan/>}/>
          <Route path="/profile" element={<Profile />} /> 
           <Route path="/balance" element={<BalanceCheck />} />
           <Route path="/profile/:email" element={<Profile />} />
          <Route path="/credit-cards" element={<CreditCardDetails />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/insurance" element={<In/>}/>
          <Route path="/transfer" element={<Money/>}/>
          <Route path="/investment-plans" element={<InvestmentPlans/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;