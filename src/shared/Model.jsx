import { getAuth, signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import React, { Children, useState } from "react";
import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function Model( {closeFunc, children} ) {
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
<>
<Helmet>
          <style type="text/css">{`
          
          .parent-of-model{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  
  .model{
    position: fixed;
    background-color: whitesmoke;
    width: 500px;
    height: 500px;
    border-radius: 5px;
    /* display: none; */
    scale: 1;
    // transition: 0.5s;
    /* transform: translateY(-100vh) rotate(360deg); */
  }
  
  /* .forgot.show{
    display: flex;
    scale: 1;
  } */
  .model input{
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.068);
  }
  
  .model .fa-xmark{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: black;
  }
  .model .fa-xmark:hover{
    transition: 0.3s;
    color:red;
  }
          `}</style>
        </Helmet>
    <div className="parent-of-model">
        <form className={`model`}  >
      
            {/* closeFunc => Function To Colse Form */}
        <i onClick={(e) => {
          closeFunc(false)
        }}  className="fa-solid fa-xmark" ></i>
        <div>
          {children}
        </div>
          {/* {Resend == "Check Your Email Now" ? <p style={{color:"black"}}>{Resend}</p> : <p  style={{color:"black"}}> {Resend}</p>} */}
        </form>
      </div>
    </>
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
