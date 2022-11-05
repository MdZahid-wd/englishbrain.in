import React from "react";
import { useState } from "react";
import Login from "../../login/Login";
const Head = () => {
  const [x, setx] = useState("login");

  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1>ALI'S RADIANT</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className="social">
            <a href="/login">
              <i className="fa fa-user icon">
                <h2>{x}</h2>
              </i>
            </a>
          </div>
        </div>
      </section>
      <Login />
    </>
  );
};

export default Head;
