import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Login from "../login/Login";
import { useState } from "react";
import axios from "axios";
import "./register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const submitHandler = async (ev) => {
    ev.preventDefault();
    try {
      // setLoading(true);
      const { data } = await axios.post("/api/register", {
        email: email,
        password1: password1,
        password2: password2,
        name: name,
      });
      console.log(data);

      if (data.name) {
        document.getElementById("login-name-id").innerHTML =
          data.name.split(" ")[0];
        document.getElementById("Login-icon").click();
      } else {
        document.getElementById("message-paragraph").innerHTML = data;
      }

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (e) {
      console.log(e, "during sending register form ");
      // setError(error.response.data.message);
    }
  };

  let [loginReq, setLoginReq] = useState(false);
  function logClick() {
    setLoginReq(true);
  }
  if (loginReq) {
    return <Login></Login>;
  } else {
    return (
      <>
        <section className="login-section rst">
          <h2 className="rst">Register</h2>
          <p id="message-paragraph"></p>
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

            <Form.Group className="mb-1 rst" controlId="formBasicPassword">
              <Form.Label className="rst">Name</Form.Label>
              <Form.Control
                className="rst"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-1 rst" controlId="formBasictext">
              <Form.Label className="rst">Set Password</Form.Label>
              <Form.Control
                className="rst"
                type="password"
                placeholder="Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-1 rst" controlId="formBasicPassword">
              <Form.Label className="rst">confirm Password</Form.Label>
              <Form.Control
                className="rst"
                type="password"
                placeholder="retype password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              onClick={() => logClick()}
              className="rst"
              variant="secondary"
            >
              login
            </Button>
            <Button className="rst" variant="primary" type="submit">
              register
            </Button>
          </Form>
        </section>
      </>
    );
  }
};

export default Register;
