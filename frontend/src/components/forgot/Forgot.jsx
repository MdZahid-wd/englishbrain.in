import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const Forgot = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const submitEmail = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/forgotPassword", { email: email });
    if (data == "success") {
    }
  };

  return (
    <>
      <section className="login-section rst">
        <h2 className="rst">forgot password</h2>
        <p className="rst" id="message-paragraph"></p>
        <Form onSubmit={submitEmail} className="rst">
          <Form.Group className="mb-1 rst" controlId="formBasicEmail">
            <Form.Label className="rst">Email address</Form.Label>
            <Form.Control
              className="rst"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted rst">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {/* <Form.Group
            id="login-password-input"
            className="mb-1 rst"
            controlId="formBasicPassword"
            hidden
          >
            <Form.Label className="rst">OTP</Form.Label>
            <Form.Control
              className=" rst"
              type="text"
              placeholder="get OTP from your email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              hidden
            />
          </Form.Group> */}
          <Button className="rst" variant="primary" type="submit">
            submit
          </Button>
        </Form>

        <p id="enter-email-paragraph"></p>
      </section>
    </>
  );
};

export default Forgot;
