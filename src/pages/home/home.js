import PropagateLoader from "react-spinners/PropagateLoader";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemeContext";
import './Home.css'
import { auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);




  
if(loading){
  return(
    <>
      <Header />
          
          <main>
            {/* <h2>ثانية واحدة أمعلم</h2> */}
            <PropagateLoader color={"#00ffff"} loading={loading}  size={15} aria-label="Loading Spinner" data-testid="loader"/>
          </main>
          <Footer />
    </>
  )
}

  return (
    <>
      <Helmet>
        <title>HOME Page</title>
        <meta name="description" content="Home" />
      </Helmet>
      <Header />
      

      
      {user ? (
        <>
        <main>
          {`Hello ${user.displayName}`} 
        </main>
          {!user.emailVerified && (
            <p>Please verify your email.</p>
          )}
        </>
      ) : (
          <main>
            Home Page
          </main>
)}
      
      <Footer />
    </>
  );
};

export default Home;
