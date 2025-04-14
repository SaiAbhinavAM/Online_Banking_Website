import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; 

function Login() {
    const navigate = useNavigate();
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/", {
                email,
                password
            });

            if (res.data === "exist") {
                history("/home", { state: { id: email } });
                history(`/home?email=${encodeURIComponent(email)}`);
                localStorage.setItem('email', email);
                navigate(`/profile/${email}`);
            } else if (res.data === "notexist") {
                alert("User has not signed up");
            }
        } catch (error) {
            alert("Wrong details");
            console.error(error);
        }
       
    }

    return (
        <div className="login">
        <h2>DigiBank</h2>
        
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input type="submit" value="Login" />
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>
        </div>
    );
}
export default Login; 

