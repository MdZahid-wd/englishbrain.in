import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Register from "../register/Register";
import { useState } from "react";
import axios from "axios";
import "./login.css";
import Forgot from "../forgot/Forgot";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [registerReq, setRegisterReq] = useState(false);
  let [forgot, setForgot] = useState(false);

  const forgotClick = async () => {
    setForgot(true);
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();

    try {
      console.log(email, password, "before sending");
      // setLoading(true);
      const { data } = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.name) {
        document.getElementById("login-name-id").innerHTML =
          data.name.split(" ")[0];
        document.getElementById("Login-icon").click();
      } else {
        console.log(data, "working");
        document.getElementById("message-paragraph").innerHTML = data;
      }
    } catch (e) {
      console.log(e, "during sending login form ");
      // setError(error.response.data.message);
    }
  };

  function regClick() {
    console.log(registerReq);
    setRegisterReq(true);
  }
  if (registerReq) {
    return <Register></Register>;
  } else if (forgot) {
    return <Forgot></Forgot>;
  } else {
    return (
      <>
        <section className="login-section rst">
          <h2 className="rst">Login</h2>
          <p className="rst" id="message-paragraph"></p>
          <Form onSubmit={submitHandler} className="rst">
            <Form.Group className="mb-1 rst" controlId="formBasicEmail">
              <Form.Label className="rst">Email address</Form.Label>
              <Form.Control
                className="rst"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted rst">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group
              id="login-password-input"
              className="mb-1 rst"
              controlId="formBasicPassword"
            >
              <Form.Label className="rst">Password</Form.Label>
              <Form.Control
                className=" rst"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="rst" variant="primary" type="submit">
              login
            </Button>
            <Button
              onClick={() => regClick()}
              className="rst"
              variant="secondary"
            >
              register
            </Button>
          </Form>
          <button
            onClick={() => forgotClick()}
            className="rst"
            id="forgot-anchor"
          >
            forgot password
          </button>
          <p id="enter-email-paragraph"></p>
        </section>
      </>
    );
  }
};

export default Login;
