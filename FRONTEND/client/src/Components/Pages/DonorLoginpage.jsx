import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import dp from "../../assets/dp.jpg";

const BASE_URL = "http://127.0.0.1:8000/api/";

const DonorLoginpage = () => {
  const [errorMsg, SeterrorMsg] = useState("");
  const [loginData, SetloginData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (event) => {
    SetloginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const LoginFormData = new FormData();
    LoginFormData.append("email", loginData.email);
    LoginFormData.append("password", loginData.password);

    try {
      const response = await axios.post(BASE_URL + "donor/login/", loginData);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("donor_id", response.data.id);
      localStorage.setItem("DonorLoginStatus", true);
      window.location.href = "/";

      console.log("Login successful", response.data);
    } catch (error) {
      if (error.response) {
        SeterrorMsg("Invalid Email or Password");
      } else if (error.request) {
        SeterrorMsg("Network error! Please try again later");
      } else {
        SeterrorMsg("An unexpected error occurred!");
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container">
          <h3 className="text-danger text-center">Donor Login</h3>
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={loginData.email}
                    onChange={handleChanges}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={loginData.password}
                    onChange={handleChanges}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <div className="col-6 mx-auto">
                  <Button
                    className="w-100 btn-danger justify-content-center mt-3 "
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorLoginpage;
