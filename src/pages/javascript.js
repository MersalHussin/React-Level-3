import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import {auth} from '../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const Javascript = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
        {!user && navigate("/sign-in")}

      <Helmet>
        <title>JAVASCRIPT Page</title>
        <meta name="description" content="JAVASCRIPTTTTTTTTTTTTTTTTTTTTT" />
        <style type="text/css">{`
   
 
        
    `}</style>
      </Helmet>
      <Header />
          <main>
            JavaScript
          </main>
      <Footer />
    </>
  );
};

export default Javascript;
