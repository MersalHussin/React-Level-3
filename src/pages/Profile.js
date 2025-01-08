import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { auth } from '../firebase/config';
import { useAuthState, } from 'react-firebase-hooks/auth';
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);


  useEffect(() => {
    if (!user && !loading) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <h3>Just a moment, please...</h3>;
  }

  if(user){
    // Creation Time
    const creationTime = new Date(user.metadata.creationTime);
    const currentTime = new Date();
    const timeDiff = currentTime - creationTime;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

    
    // Last Sign in Time
    const LastTime = new Date(user.metadata.lastSignInTime);
    const currentTime1 = new Date();
    const timeDiff1 = currentTime1 - LastTime;
    const days1 = Math.floor(timeDiff1 / (1000 * 60 * 60 * 24));
    const hours1 = Math.floor((timeDiff1 / (1000 * 60 * 60)) % 24);
    const minutes1 = Math.floor((timeDiff1 / (1000 * 60)) % 60);

    return (
      <>
        <Helmet>
          <title>Profile Page</title>
          <meta name="description" content="JAVASCRIPTTTTTTTTTTTTTTTTTTTTT" />
          <style type="text/css">{``}</style>
        </Helmet>
        <Header />
        <main style={{ flexDirection: "column",width:"fit-content",alignItems:"flex-start" }}>
          <h3>Email: {user.email}</h3>
          <h3>User name: {user.displayName}</h3>
          <h3>Account Age : {days} days, {hours} hours , {minutes} minutes </h3>
          <h3>Last signin : {days1} days, {hours1} hours , {minutes1} minutes</h3>
          <button style={{backgroundColor:"red",border:"none",padding:"10px",cursor:"pointer"}} onClick={()=>{
            if(window.confirm("Are You Sure")){
              deleteUser(user).then(() => {
                console.log("acc Deleted Done")
              }).catch((error) => {
                console.log(error)
              });
            }   
          }}> Delete Account</button>
        </main>
        <Footer />
      </>
    );
  }
    

  return null;
};

export default Profile;
