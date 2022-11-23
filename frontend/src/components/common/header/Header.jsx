import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import { useEffect } from "react";
import axios from "axios";
import Profile from "../../profile/Profile";

const Header = () => {
  function viewClick() {
    console.log("view click");
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  }
  document.body.addEventListener("click", (e) => {
    if (!e.target.classList.contains("rst1")) {
      if (profile) {
        setProfile(false);
      }
    }
  });
  const fetchJWT = async () => {
    const { data } = await axios.get("/api/jwt");
    if (data.login == "login") {
    } else {
      document.getElementById("login-name-id").innerHTML = data.login;
    }

    console.log(data);
  };
  useEffect(() => {
    //Runs only on the first render
    fetchJWT();
  }, []);

  const [click, setClick] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/journal">Journal</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="start">
            <div
              onClick={viewClick}
              id="dashboard-button"
              className="button rst1"
            >
              dashboard
            </div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
      {profile && <Profile></Profile>}
    </>
  );
};

export default Header;
