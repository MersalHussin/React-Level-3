import { getAuth, signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function Model( {closeFunc} ) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [Resend, setResend] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [showModel, setshowModel] = useState(false);

  return (

    <div className="parent-of-model">
        <form className={`model`}  >
      
            {/* closeFunc => Function To Colse Form */}
        <i onClick={(e) => {
          closeFunc(false)
        }}  className="fa-solid fa-xmark" ></i>

          {Resend == "Check Your Email Now" ? <p style={{color:"black"}}>{Resend}</p> : <p  style={{color:"black"}}> {Resend}</p>}
        </form>
      </div>
  )
}

export default Model







{/* <input
placeholder="Email"
required
type="email"
name="femail"
onChange={(e) => {
  setForgotEmail(e.target.value);
}}
/>

<button onClick={(e) => 
{
  e.preventDefault()
  {forgotEmail && 
  

  sendPasswordResetEmail(auth, forgotEmail)
  .then(() => {
    setResend("Check Your Email Now")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setResend(errorCode)
  });
  }
  }}>Resend Password</button> */}
