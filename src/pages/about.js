


import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet  } from 'react-helmet-async';
import ThemeContext from '../context/ThemeContext';
import {auth} from '../firebase/config'

import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';




const Html = () => {
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
  // const {theme} = useContext(ThemeContext);
if(user){

  if(!user.emailVerified){
    navigate("/sign-in")
  }else{
    return(
      <>
    <Helmet>
    <title>HTML Page</title>
    <meta name="description" content="HTMLLLLLLLLLLLLLLLL" />
    </Helmet>
    <Header />
    <main>
      About Page
    </main>
    <Footer />
    </>
    )
  }
}

}

export default Html;
