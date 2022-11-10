import React from "react";
import { useState } from "react";
import Login from "../../login/Login";

document.body.addEventListener("click", function (e) {
  if (!document.querySelector(".login-section")) {
    console.log("zzzzzzzzzzzzzz");
  }
});
const Head = () => {
  console.log("checked head");
  const [login, setLogin] = useState(false);
  function loginHandler() {
    console.log("clicked");
    if (!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

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
