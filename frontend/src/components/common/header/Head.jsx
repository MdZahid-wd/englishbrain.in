import React from "react";
import { useState } from "react";
import Login from "../../login/Login";

const Head = (props) => {
  const [login, setLogin] = useState(false);
  function loginHandler() {
    if (!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  document.body.addEventListener("click", (e) => {
    if (!e.target.classList.contains("rst")) {
      if (login) {
        setLogin(false);
      }
    }
  });

  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1>
              <img src="./images/logo-modified.png" alt="logo" />
              ALI'S RADIANT
            </h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className="social">
            <i
              onClick={() => loginHandler()}
              class="fa-regular fa-user icon rst"
            >
              <p className="rst">Login</p>
            </i>
          </div>
        </div>
      </section>
      {login && <Login register="res"></Login>}
    </>
  );
};

export default Head;
