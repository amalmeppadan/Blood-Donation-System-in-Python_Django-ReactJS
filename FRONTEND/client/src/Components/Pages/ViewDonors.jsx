import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import prof from "../../assets/t3.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import dp from "../../assets/dp.jpg";
const BASE_URL = "http://127.0.0.1:8000/api/";

const ViewDonors = () => {
  const { group } = useParams(); // Fetch blood group name

  const [donorData, setDonorData] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bloodGroups, setBloodGroups] = useState({});

  // Fetching Blood Groups
  const fetchBloodGroups = async () => {
    try {
      const response = await axios.get(BASE_URL + "blood-groups/");
      const bloodGroupMap = response.data.reduce((map, group) => {
        map[group.id] = group.name; // Map blood group ID to name
        return map;
      }, {});
      setBloodGroups(bloodGroupMap);
    } catch (error) {
      console.error("Error fetching blood groups:", error);
    }
  };

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}donors/${encodeURIComponent(group)}`
        );
        setDonorData(response.data);
      } catch (error) {
        console.error("Error fetching donor data", error);
      }
    };

    fetchDonorData();
    fetchBloodGroups();
  }, [group]);

  const handleShowModal = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDonor(null);
  };

  const DonorLoginStatus = localStorage.getItem("DonorLoginStatus");
  if (DonorLoginStatus != "true") {
    window.location.href = "/donor/login";
  }

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>State|City</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {donorData.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td>
                {donor.state} | {donor.city}
              </td>
              <td>
                <Button
                  onClick={() => handleShowModal(donor)}
                  className="btn-sm"
                  variant="outline-info"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Donor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDonor ? (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 align-items-center">
                  <img
                    width={300}
                    className="align-item-center"
                    src={dp}
                    alt={selectedDonor.name}
                  />
                </div>
                <div className="container bg-danger-subtle mt-3">
                  <p className="fw-bold">Name: {selectedDonor.name}</p>
                  <p className="fw-bold">Mobile No: {selectedDonor.phone}</p>
                  <p className="fw-bold">
                    BloodGroup:{" "}
                    {bloodGroups[selectedDonor.blood_group] || "Unknown"}
                  </p>
                  <p className="fw-bold">Address: {selectedDonor.address}</p>
                  <p className="fw-bold">Gender: {selectedDonor.gender}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>No donor selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewDonors;
