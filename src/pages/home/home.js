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
        {user.emailVerified && (
        <main className="home">
          <h1 style={{display:'fle',}}>{`Hello ${user.displayName}`}</h1>
          {/* OPTIONS */}
          <section className="parent-of-btns">
            <button>Oldest frist</button>
            <button>Newest frist</button>

            <select id="browesers" name="All Tasks" value="All Tasks">
              <option value="Chrome">All Tasks</option>
              <option value="Chrome">Complated </option>
              <option value="Chrome"> Un complated </option>
            </select>
          </section>



          {/* SHOW all tasks */}

<section className="all-tasks mt">
  <article dir="auto" className="task">
    <h2>New Task</h2>
    <ul>
      <li>Sub task</li>
      <li>Sub task 2</li>
    </ul>
    <p className="time">
      a day ago
    </p>
  </article>
  <article dir="auto" className="task">
    <h2>New Task</h2>
    <ul>
      <li>Sub task</li>
      <li>Sub task 2</li>
    </ul>
    <p className="time">
      a day ago
    </p>
  </article>
  <article dir="auto" className="task">
    <h2>New Task</h2>
    <ul>
      <li>Sub task</li>
      <li>Sub task 2</li>
    </ul>
    <p className="time">
      a day ago
    </p>
  </article>
  <article dir="auto" className="task">
    <h2>عمل بطاطس</h2>
    <ul>
      <li>تقشير البطاطس</li>
      <li>تحمير البطاطس</li>
    </ul>
    <p className="time">
      منذ يوم
    </p>
  </article>

</section>




          {/* Add new task BTN */}
          
            <button className="add-task-btn mt">Add New Task <i className="fa-solid fa-plus"></i></button>






        </main>
        )}
        {!user.emailVerified && (
          <p>Please verify your email.</p>
        )}
        </>
      ) : (
        <main>
        {/* If User Is Active */}
        </main>
)}
      
      <Footer />
    </>
  );
};

export default Home;
