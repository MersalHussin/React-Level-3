import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import {auth} from '../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const Css = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
        {!user && navigate("/sign-in")}

      <Helmet>
        <title>CSS Page</title>
        <meta name="description" content="csssssssssssssssssssss" />
      </Helmet>

      <Header />

      <main>
        About Page
      </main>
      <Footer />
    </>
  );
};

export default Css;
