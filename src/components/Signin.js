import React, { useState } from "react";
import "./signin.css";
import "./Background.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signin() {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try
    {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
      position: "top-center",
      });
      navigate("/");
    }
    catch(error)
    {
      console.log(e.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  return(
    <form onSubmit = {handleSubmit}>
      
      <div className = "body2">
        <div className = "overlay1">
          <div className="signin-container">
          <h2>Login</h2>
            <label>Email</label>
            <input 
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type = "password"
              className="form-control"
              placeholder= "Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button type = "submit" className="sign">
                Sign In
              </button>
              <p className="forgot-password text-right">
                 New user <a href="/Register">Register Here</a>
              </p>
          </div>
        </div>
      </div>
    </form>
  )
}



export default Signin;
