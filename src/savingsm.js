/* import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserProfile from './savings';

function Savings() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // **REPLACE THIS WITH YOUR ACTUAL AUTHENTICATION LOGIC**
    const storedEmail = localStorage.getItem('userEmail'); // Placeholder - how you get the email depends on your auth setup
    setEmail(storedEmail);
  }, []);

  if (email === null) {
    return <p>Loading...</p>;
  } else if (email === undefined || email === '') {
    // Redirect to login if email retrieval fails (user not logged in)
    return <Navigate to="/" />;  // Assuming "/" is your login route
  }

  return <UserProfile email={email} />;
}

export default Savings; */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserProfile from './savings'; // Correct import
import { collection } from '../mongo';

function Savings() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    //const storedEmail = collections.getItem('email');
    const storedEmail = localStorage.getItem('email');

    setEmail(storedEmail);
  }, []);

  if (email === null) {
    return <p>Loading...</p>;  // Still loading
  } else if (!email) { // Simplified condition - covers undefined, null, and empty string
    return <Navigate to="/" />; 
  }

  return <UserProfile email={email} />; // Now email will always have a value
}

export default Savings;