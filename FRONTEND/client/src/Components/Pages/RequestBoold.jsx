import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

const RequestBoold = () => {
  const [donorData, SetdonorData] = useState({
    name: "",
    email: "",
    mobno: "",
    state: "",
    city: "",
    address: "",
    bloodgroup: "",
    date: "",
  });
  //handling changes

  const handleChange = (event) => {
    SetdonorData({
      ...donorData,
      [event.target.name]: event.target.value,
    });
  };

  // request/blood/

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
    DonorFormData.append("phone", donorData.phone);
    DonorFormData.append("state", donorData.state);
    DonorFormData.append("city", donorData.city);
    DonorFormData.append("address", donorData.address);
    DonorFormData.append("blood_group", bloodGroupMap[donorData.bloodgroup]);
    DonorFormData.append("date", donorData.date);

    try {
      axios
        .post(BASE_URL + "request/blood/create", DonorFormData)
        .then((res) => {
          SetdonorData({
            name: "",
            email: "",
            mobno: "",
            state: "",
            city: "",
            address: "",
            bloodgroup: "",
            date: "",
          });
          window.location.href = "/all-doners/request/";
        });
    } catch (error) {
      console.log({ status: error });
    }
  };

  const DonorLoginStatus = localStorage.getItem("DonorLoginStatus");
  if (DonorLoginStatus != "true") {
    window.location.href = "/donor/login";
  }

  return (
    <div className="container mt-3 ">
      <h3 className="text-danger text-center">Request for Blood</h3>
      <div className="row  mt-3">
        <div className="col-12 ">
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                style={{ width: "100" }}
                value={donorData.name}
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter fullname"
              />
            </Form.Group>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={donorData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control
                    value={donorData.mobno}
                    onChange={handleChange}
                    type="text"
                    name="mobno"
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
                    value={donorData.state}
                    onChange={handleChange}
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
                    value={donorData.city}
                    onChange={handleChange}
                    type="text"
                    name="city"
                    placeholder="Enter city"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="col-12">
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={donorData.address}
                  onChange={handleChange}
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
                    name="bloodgroup"
                    as="select"
                  >
                    <option>Blood Group</option>
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
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    value={donorData.date}
                    onChange={handleChange}
                    name="date"
                    type="date"
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

export default RequestBoold;
