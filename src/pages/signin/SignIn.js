import React, { useState } from "react";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword , sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import "./signin.css";
import Model from "../../shared/Model";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [Resend, setResend] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  
  useEffect(() => {
    {
      user && navigate("/");
    }
  });

  const signInBTN = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMessage("أكتب الإيميل صح يمعلم");
            break;
          case "auth/invalid-credential":
            setErrorMessage("الإيميل ده مش موجود ياكبير");
            break;
          default:
            setErrorMessage(errorCode);
        }
      });
  }


  
    const [showModel, setshowModel] = useState(false);
  function closeModel(){
    setshowModel(false)
  }
  function forgotPassword(){
    setshowModel(true)
  }

  // From Level 3
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Header />

      <main>




      {showModel && (
              <Model closeFunc={closeModel}>
            <input
            placeholder="Email"
            required
            type="email"
            name="femail"
            onChange={(e) => {
              setForgotEmail(e.target.value);
            }}
            />
  <div>

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
              }}>Resend Password</button>         
                </div>

        </Model>
              )}




        <form>
          {/* <label htmlFor='email'>Email</label> */}
          <input
            placeholder="Email"
            required
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* <label htmlFor='pass'>Password</label> */}
          <input
            placeholder="Password"
            required
            type="password"
            name="pass"
            onChange={(e) => {
              setPassword(e.target.value);
            }}

          />
          <button
            onClick={(e) => {
              signInBTN(e)
            }}
          >
            Sign in
          </button>
          <p className="acc">
            Don't Have an account <Link to="/sign-up">SingUp</Link>
          </p>
          <p className="acc mt">
            <Link onClick={() => {
              forgotPassword();
            }}>Forgot Password?</Link>
          </p>

          {hasError && <h3>{ErrorMessage}</h3>}
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Signin;
