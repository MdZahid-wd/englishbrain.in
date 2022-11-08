import React from "react";
import { useState } from "react";
import Login from "../../login/Login";

const Head = () => {
  console.log("checked head");
  const [login, setLogin] = useState(false);
  function loginHandler() {
    console.log("clicked");
    if (!login) {
      setLogin(true);
    }
  }
  document.body.addEventListener("click", function (e) {
    let a = e.target.classList.value;
    let b = document.getElementsByClassName(a);
    if (b == document.getElementsByClassName("login-section")) {
      console.log("section");
    }

    console.log(a, b);
  });

  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1>ALI'S RADIANT</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className="social">
            <i onClick={() => loginHandler()} class="fa-regular fa-user icon">
              <p>Login</p>
            </i>
          </div>
        </div>
      </section>
      {login && <Login></Login>}
    </>
  );
};

export default Head;
