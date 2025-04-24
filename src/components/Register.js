import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import "./Register.css";
import "./Background.css";

function Register() {
  const navigate = useNavigate(); 
  const[fname, setFname] = useState("");
  const[lname, setLname] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try
    {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if(user)
        {
          if(email === "lisley416@gmail.com")
            await setDoc(doc(db, "Users", user.uid),{
                email: user.email,
                firstName: fname,
                lastName: lname,
                role: "admin",
            });
            else
            await setDoc(doc(db, "Users", user.uid),{
                email: user.email,
                firstName: fname,
                lastName: lname,
                role: "user",
            });
          
        }
        console.log(user);
        console.log("User Registered Successfully!");
        navigate("/");

    }
    catch(error)
    {
        console.log(error.message);
    }
  }

  return(
    <form onSubmit = {handleRegister}>
      
      <div className = "body2">
        <div className = "overlay1">
          <div className="register-container">
            <h3>Sign-Up</h3>
            <label>First Name</label>
            <input 
              type="text"
              className="form-control"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />

            <label>Last Name</label>
            <input 
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />

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

              <button type = "submit" className="reg">
                Sign Up
              </button>
              <p className="forgot-password text-right">
                Already registered <a href="/signin">Login</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}



export default Register;

