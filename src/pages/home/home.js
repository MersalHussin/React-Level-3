import PropagateLoader from "react-spinners/PropagateLoader";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./Home.css";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Model from "../../shared/Model";
import { doc, setDoc } from "firebase/firestore"; 
import ReactLoading from 'react-loading';



const Home = () => {
  const [showModel, setshowModel] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [data, setData] = useState([]);
  const [dataValue, setDataValue] = useState("");
  const [titleName, setTitleName] = useState("");


const addFunc = () =>{
  {dataValue != "" &&
    data.push(dataValue)
    console.log(data)
    setDataValue("")
  }
}
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
                    onChange={(e)=>{
                      setTitleName(e.target.value);
                    }}
                    value={titleName}
                  />

                  <div className="add-details" style={{ display: "flex" }}>
                    <input
                      placeholder="Add Details"
                      required
                      type="text"
                      name="details"
                      onChange={(eo) => {
                        setDataValue(eo.target.value)
                      }}
                      value={dataValue}
                      />

                    <button style={{ width: "fit-content", height: "fit-content", padding: "15px" }} onClick={(e)=>{
                    e.preventDefault()
                    addFunc()
                  }}>add</button>
                  </div>
                  
                  <ul className="list">
                    {data.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>


                  <button className={`${showLoading && "disabled"}`} onClick={ async(e)=>{
                    e.preventDefault()
                    setshowLoading(true)
                    const TaskID = `${new Date().getTime()}`

                    console.log("wating........")

                    await setDoc(doc(db, user.uid, TaskID), {
                      title: titleName,
                      dataeils:data,
                      id:TaskID
                    });  

                    console.log("Done")

                    setData([])
                    setTitleName("")
                    setshowLoading(false)
                    {setShowMessage(true)} 
                    setTimeout(() => {
                      setShowMessage(false)
                    }, 4000);

                  }}>

                    {showLoading ? <ReactLoading type={"spin"} color={"white"} height={20} width={20} /> : "Submit"}
                  </button>
                  </div>
                </Model>
              )}

              <p style={{right: showMessage ? "20px" : "-100vw" }} className="taskMessage">
              <i class="fa-regular fa-circle-check"></i>  Task Add Succesfully
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
