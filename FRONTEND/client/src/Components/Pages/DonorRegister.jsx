import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/donor/register/";

const DonorRegister = () => {
  const [statusMessage, setStatusMessage] = useState(""); //for error message
  const [donorData, SetdonorData] = useState({
    name: "",
    email: "",
    mobno: "",
    state: "",
    city: "",
    address: "",
    photo: "",
    password: "",
    bloodgroup: "",
    gender: "",
  }); //for holding data

  //handling changes

  const handleChange = (event) => {
    SetdonorData({
      ...donorData,
      [event.target.name]: event.target.value,
    });
  };

  //handling file changes

  const handleFileChange = (event) => {
    SetdonorData({
      ...donorData,
      photo: event.target.files[0],
    });
  };

  //post donors data

  const submitForm = (event) => {
    event.preventDefault();

    const bloodGroupMap = {
      "A+": 20,
      "A-": 21,
      "B+": 22,
      "B-": 23,
      "O+": 24,
      "O-": 25,
      "AB+": 26,
      "AB-": 27,
    };

    const DonorFormData = new FormData();
    DonorFormData.append("name", donorData.name);
    DonorFormData.append("email", donorData.email);
    DonorFormData.append("phone", donorData.mobno);
    DonorFormData.append("state", donorData.state);
    DonorFormData.append("city", donorData.city);
    DonorFormData.append("address", donorData.address);
    DonorFormData.append("image", donorData.photo);
    DonorFormData.append("blood_group", bloodGroupMap[donorData.bloodgroup]);
    DonorFormData.append("gender", donorData.gender);
    DonorFormData.append("password", donorData.password);

    try {
      axios
        .post(BASE_URL, DonorFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          SetdonorData({
            name: "",
            email: "",
            mobno: "",
            state: "",
            city: "",
            address: "",
            password: "",
            bloodgroup: "",
            gender: "",
          });
          setStatusMessage("Thank you for your registration!");
          localStorage.setItem("DonorLoginStatus", "success"); // Set status in localStorage
          window.location.href = "/"; // Redirect to home page
        });
    } catch (error) {
      console.log({ status: error });
    }
  };

  return (
    <div className="container mt-3 ">
      <h3 className="text-danger text-center">Doner Registeration</h3>
      <div className="row  mt-3">
        <div className="col-12 ">
          {/* toast message for register success */}

          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                style={{ width: "100" }}
                type="text"
                value={donorData.name}
                onChange={handleChange}
                name="name"
                placeholder="Enter fullname"
              />
            </Form.Group>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={donorData.email}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={donorData.mobno}
                    name="mobno"
                    type="text"
                    placeholder="Enter contact number"
                  />
                </Form.Group>
              </div>
            </div>
            {/* s */}
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={donorData.state}
                    name="state"
                    type="text"
                    placeholder="Enter state"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={donorData.city}
                    name="city"
                    type="text"
                    placeholder="Enter city"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="col-12">
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={donorData.address}
                  name="address"
                  as={"textarea"}
                  rows={4}
                  placeholder="Enter address"
                />
              </Form.Group>
            </div>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Select Blood group</Form.Label>
                  <Form.Control
                    value={donorData.bloodgroup}
                    onChange={handleChange}
                    as="select"
                    name="bloodgroup"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={donorData.gender}
                    name="gender"
                    as="select"
                  >
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Trans</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    onChange={handleFileChange}
                    name="photo"
                    type="file"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    value={donorData.password}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-6 mx-auto mb-4">
                <Button
                  className="w-100 justify-content-center btn-md btn-danger mt-3 b-4 "
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;
