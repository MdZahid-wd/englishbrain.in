import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Login from "../login/Login";
import { useState } from "react";
import "./register.css";
const Register = () => {
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
              <Form.Label className="rst">Name</Form.Label>
              <Form.Control className="rst" type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-1 rst" controlId="formBasicPassword">
              <Form.Label className="rst">Set Password</Form.Label>
              <Form.Control
                className="rst"
                type="password"
                placeholder="Password"
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
