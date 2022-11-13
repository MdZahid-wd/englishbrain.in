import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Register from "../register/Register";
import { useState } from "react";
import "./login.css";
const Login = () => {
  let [registerReq, setRegisterReq] = useState(false);
  function regClick() {
    console.log(registerReq);
    setRegisterReq(true);
  }
  if (registerReq) {
    return <Register></Register>;
  } else {
    return (
      <>
        <section className="login-section rst">
          <h2 className="rst">Login</h2>
          <Form className="rst">
            <Form.Group className="mb-1 rst" controlId="formBasicEmail">
              <Form.Label className="rst">Email address</Form.Label>
              <Form.Control
                className="rst"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted rst">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-1 rst" controlId="formBasicPassword">
              <Form.Label className="rst">Password</Form.Label>
              <Form.Control
                className="rst"
                type="password"
                placeholder="Password"
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
        </section>
      </>
    );
  }
};

export default Login;
