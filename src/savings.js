// Savings.js
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


function Savings() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);
  }, []);

  if (email === null) {
    return <p>Loading...</p>;
  } else if (email === undefined || email === '') {
    return <Navigate to="/" />;  // Assuming "/" is your login route

  return <UserProfile email={email} />;
}
}

export default Savings;


