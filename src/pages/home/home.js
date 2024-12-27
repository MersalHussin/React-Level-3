import PropagateLoader from "react-spinners/PropagateLoader";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./Home.css";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Model from "../../shared/Model";

const Home = () => {
  const [showModel, setshowModel] = useState(false);
  function closeModel() {
    setshowModel(false);
  }
  const [user, loading, error] = useAuthState(auth);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <>
        <Header />

        <main>
          {/* <h2>ثانية واحدة أمعلم</h2> */}
          <PropagateLoader
            color={"#00ffff"}
            loading={loading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </main>
        <Footer />
      </>
    );
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
              <h1 style={{ display: "flex" }}>{`Hello ${user.displayName}`}</h1>
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
                  <Link to="/edit-task">
                    <h2>New Task</h2>
                    <ul>
                      <li>Sub task</li>
                      <li>Sub task 2</li>
                    </ul>
                    <p className="time">a day ago</p>
                  </Link>
                </article>
              </section>

              {/* Add new task BTN */}

              <button
                className="add-task-btn mt"
                onClick={() => {
                  setshowModel(true);
                }}
              >
                Add New Task <i className="fa-solid fa-plus"></i>
              </button>

              {showModel && (
                
                <Model closeFunc={closeModel}>
                  <div style={{textAlign:"left"}}>
                  <input
                    placeholder="Add Title"
                    required
                    type="text"
                    name="title"
                    onClick={(e)=>{
                      e.preventDefault()
                    }}
                  />

                  <div className="add-details" style={{ display: "flex" }}>
                    <input
                      placeholder="Add Details"
                      required
                      type="text"
                      name="details"
                      onChange={(e) => {}}
                      />

                    <button style={{ width: "fit-content", height: "fit-content", padding: "15px" }} onClick={(e)=>{
                    e.preventDefault()
                  }}>add</button>
                  </div>
                  <button onClick={(e)=>{
                    e.preventDefault()
                  }}>Submit</button>
                  </div>
                </Model>
              )}
            </main>
          )}
          {!user.emailVerified && <p>Please verify your email.</p>}
        </>
      ) : (
        <main>{/* If User Is Active */}</main>
      )}

      <Footer />
    </>
  );
};

export default Home;
