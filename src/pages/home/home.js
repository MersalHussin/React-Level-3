import PropagateLoader from "react-spinners/PropagateLoader";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import {  useEffect, useState } from "react";
import "./Home.css";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import HomeModel from "./HomeModel";
import TasksSection from "./TasksSection";

const Home = () => {
  const [showModel, setshowModel] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [data, setData] = useState([]);
  const [dataValue, setDataValue] = useState("");
  const [titleName, setTitleName] = useState("");

  const [user, loading, ] = useAuthState(auth);
  // const { theme } = useContext(ThemeContext);
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

  // ==============================
  //      Functions of model
  // ==============================

  function closeModel() {
    setshowModel(false);
  }

  const titleInput = (e) => {
    setTitleName(e.target.value);
  };
  const detailsInput = (e) => {
    setDataValue(e.target.value);
  };
  const submitBTN = async (e) => {
    e.preventDefault();
    setshowLoading(true);
    const TaskID = `${new Date().getTime()}`;

    console.log("wating........");

    await setDoc(doc(db, user.uid, TaskID), {
      title: titleName,
      dataeils: data,
      id: TaskID,
    });

    console.log("Done");

    setData([]);
    setTitleName("");
    setshowLoading(false);
    {
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  const addFunc = (e) => {
    e.preventDefault();
      if(!data.includes(dataValue) && dataValue != ""){
        dataValue != "" && data.push(dataValue);
        console.log(data);
      }
      setDataValue("");
  };

  // ==============================
  //      Return Code
  // ==============================
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

                <select id="browesers" name="All Tasks" value="All Tasks"
                  onChange={(e) => {e.preventDefault()}}>
                <option value="All Tasks">All Tasks</option>
                <option value="Completed">Completed</option>
                <option value="Uncompleted">Uncompleted</option>
                </select>
              </section>

              {/* SHOW all tasks */}

            <TasksSection user={user}/>

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
                <HomeModel
                  closeModel={closeModel}
                  data={data}
                  dataValue={dataValue}
                  titleName={titleName}
                  titleInput={titleInput}
                  detailsInput={detailsInput}
                  addFunc={addFunc}
                  submitBTN={submitBTN}
                  showLoading={showLoading}
                />
              )}

              <p
                style={{ right: showMessage ? "20px" : "-100vw" }}
                className="taskMessage"
              >
                <i className="fa-regular fa-circle-check"></i> Task Add
                Succesfully
              </p>
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
