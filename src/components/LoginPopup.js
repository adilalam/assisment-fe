import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";
import "./LoginPopup.css"; // Import CSS for styling

const LoginPopup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    // alert(`Signing in with email: ${email}`);
    // Add sign-in logic here
    try {
        const response = await axios.post("http://localhost:4001/login", {
            email,
            password,
        });
        // console.log(response.data);
        localStorage.setItem('authToken', response.data.token);
        // alert("Login Success");
        setEmail("");
        setPassword("");
        navigate("/")
      } catch (error) {
        alert(error.response.data.message);
        // console.error("Error saving data:", error);
      }
  };

  const handleSignUp = async () => {
    // alert(`Signing up with email: ${email}`);
    // Add sign-up logic here

    try {
        const response = await axios.post("http://localhost:4001/createUser", {
            email,
            password,
        });
        // console.log(response.data);
        localStorage.setItem('authToken', response.data.token);
        // alert("Sign up Success");
        setEmail("");
        setPassword("");
        navigate("/")
      } catch (error) {
        alert(error.response.data.message);
        // console.error("Error saving data:", error.response.data.message);
      }

  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Login</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="popup-buttons">
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <Link to="/">
          <button className="close-button">Close</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
