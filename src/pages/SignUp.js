import Header from '../comp/header'
import Footer from '../comp/Footer'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword , updateProfile , sendEmailVerification} from "firebase/auth";
import {auth} from '../firebase/config'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { logDOM } from '@testing-library/react'



function SignUp() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [hasError, sethasError] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState(false)



  const signup = (e) => {
                
      e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: userName
        }).then(() => {
          navigate("/sign-up")
        }).catch((error) => {
          console.log(error.code)  
        });
        sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });
        
        // ...
        console.log("done")
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true)
        
        switch (errorCode){
          case "auth/invalid-email":
            setErrorMessage("أكتب الإيميل صح يمعلم")
            break
          case "auth/invalid-credential":
            setErrorMessage("الإيميل ده مش موجود ياكبير")
            break
          default:
            setErrorMessage(errorCode)
        }
      });
  }


if(loading){
  return(
    <>
      <Header />
          <main>
            <h2>ثانية واحدة أمعلم</h2>
          </main>
          <Footer />
    </>
  )
}

  

  if(!user ){
    return (
      <>
      <Helmet>
              <title>Sign Up</title>
            </Helmet>
            <Header />
          
            <main>
            <form>
              <p>Create New Account Now</p>
              {/* <label htmlFor='name'>User name</label> */}
              <input placeholder='User name' type="text" name='name' onChange={(e) => {
                setUserName(e.target.value)
                console.log(userName)
              }}/>
              {/* <label htmlFor='email'>Email</label> */}
              <input placeholder='Email' required type="email" name='email'
              onChange={(e)=>{
              setEmail(e.target.value)
              console.log(email)
              }}/>
              {/* <label htmlFor='pass'>Password</label> */}
              <input placeholder='Password' required  type="password" name='pass'
                onChange={(e)=>{
                  setPassword(e.target.value)
                  console.log(password)
                  }}/>
              <button onClick={(e) => signup(e)}>Sign Up</button>
              <p className='acc'>
                Have an account <Link to="/sign-in">Sing in</Link>
              </p>
              {hasError&& <h3>{ErrorMessage}</h3>}
    
            </form>
            
            </main>
            <Footer />
      </>
      )
  }

  if (!user.emailVerified){
    return(
      <>
    <Header />
      <main>
      <h3> Plesae Verifay your email </h3>
      </main>
      <Footer />
    </>
    )
  }else{
    navigate("/")
  }


}


export default SignUp