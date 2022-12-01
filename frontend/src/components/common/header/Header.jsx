import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import { useEffect } from "react";
import axios from "axios";
import Profile from "../../profile/Profile";

const Header = () => {
  let [click, setClick] = useState(false);
  let [profile, setProfile] = useState(false);
  let [profileData, setProfileData] = useState();
  const dashboardClick = async () => {
    setClick(false);
    if (profile) {
      setProfile(false);
    } else {
      try {
        const { data } = await axios.get("/api/profile");

        if (data) {
          setProfileData(data);
        }
      } catch (e) {
        console.log(e);
      }
      setProfile(true);
    }
  };
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

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB "}>
            <li>
              <Link onClick={() => setClick(false)} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setClick(false)} to="/courses">
                All Courses
              </Link>
            </li>
            <li>
              <Link onClick={() => setClick(false)} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={() => setClick(false)} to="/team">
                Team
              </Link>
            </li>
            <li>
              <Link onClick={() => setClick(false)} to="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link onClick={() => setClick(false)} to="/journal">
                Journal
              </Link>
            </li>
            <li>
              <Link onClick={() => setClick(false)} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="start">
            <div
              onClick={() => dashboardClick()}
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

      {profile && <Profile profileDetail={profileData}></Profile>}
    </>
  );
};

export default Header;
