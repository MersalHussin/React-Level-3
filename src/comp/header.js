import {React, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import  '../theme.css';
import ThemeContext from "../context/ThemeContext";
import {auth} from '../firebase/config'
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const {theme,changeTheme} = useContext(ThemeContext);


  return (
    <div className="myheader">
      {/* {user && <h3>Donneee</h3>} */}
      <header className="hide-when-mobile ali">
        <h1>
          <Link to="/">Mersal</Link>
        </h1>
        <button className="theme-btn" onClick={()=>{changeTheme(theme == "Light" ? "Dark" : "Light")}} >{theme== "Light" ? "🌙" : "☀️"}</button>
       
        <ul className="flex">
        {user && 
        <>
          <li className="main-list">
            <NavLink className="main-link" to="/about">
              About
            </NavLink>
            <ul className="sub-ul">
              <li>
                <a href="">Full Course </a>
              </li>
              <li>
                <a href="">Crash Course</a>
              </li>
              <li>
                <a href="">learn in 1h</a>
              </li>
            </ul>
          </li>

          {/*<li className="main-list">
            <NavLink className="main-link" to="/css">
              CSS
            </NavLink>
            <ul className="sub-ul">
              <li>
                <a href="">Full Course</a>
              </li>
              <li>
                <a href="">CSS Examples</a>
              </li>
              <li className="mini-projects">
                <a href="">mini projects&nbsp; + </a>
                <ul className="sub-sub-ul">
                  <li>
                    <a href="">project 1</a>
                  </li>
                  <li>
                    <a href="">project 2</a>
                  </li>
                  <li>
                    <a href="">project 3</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>*/}
          <li className="main-list">
            <NavLink className="main-link" to="/profile">
              Profile
            </NavLink>
          </li>
          </>
        }
          {!user && 
          <>
          <li className="main-list">
            <NavLink className="main-link" to="/sign-in">
              Sign In
            </NavLink>
          </li>
          <li className="main-list">
            <NavLink className="main-link" to="/sign-up">
              Sign Up
            </NavLink>
          </li>
          </>
          }

      {user && 

              <li onClick={()=>{
                const auth = getAuth();
                signOut(auth).then(() => {
                  // Sign-out successful.
                }).catch((error) => {
                  // An error happened.
                });
              }} className="main-list">
            <NavLink className="main-link" >
              Sign Out
            </NavLink>
          </li>
}
        </ul>
      </header>

      <header className="show-when-mobile ali">
        <h1>c4a.dev</h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus" />
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/about">Full Course</NavLink>
              </li>
              <li>
                <a href="">Crash Course</a>
              </li>
              <li>
                <a href="">learn in 1h</a>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus" />
            </label>
           <input id="css" type="checkbox" />
            {/*  <ul className="sub-div">
              <li>
                <NavLink to="/css">Full Course</NavLink>
              </li>
              <li>
                <a href="">CSS Examples</a>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus" />
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <a href="">project 1</a>
                  </li>
                  <li>
                    <a href="">project 2</a>
                  </li>
                  <li>
                    <a href="">project 3</a>
                  </li>
                </ul>
              </li>
            </ul> */}
          </div>
          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus" />
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/javascript">coming soon🔥 أهلًا بيك</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
