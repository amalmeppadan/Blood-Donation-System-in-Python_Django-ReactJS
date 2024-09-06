import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "http://127.0.0.1:8000/api/";

const SeeAllRequest = () => {
  const [donorData, setDonorData] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [action, setAction] = useState("");
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

  const handleDelete = async (donorId) => {
    console.log("Deleting Donor ID:", donorId); // Check donor ID here

    try {
      const response = await axios.delete(
        `${BASE_URL}request-blood/delete/${donorId}/`
      );
      // Refresh donor data after deletion
      const updatedDonorData = donorData.filter(
        (donor) => donor.id !== donorId
      );
      setDonorData(updatedDonorData);
      if (updatedDonorData) {
        Swal.fire({
          title: "Data has been deleted",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      console.log("Request Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await axios.get(BASE_URL + "request/donors-list/");

        setDonorData(response.data);
        if (response.data.length > 0) {
          setAction("Ready to donate");
        }
      } catch (error) {
        console.error("Error fetching donor data", error);
      }
    };

    fetchDonorData();
    fetchBloodGroups();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDonor(null); // Reset only the selected donor
    setShowModal(false);
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
            <th>Blood Group</th>
            <th>State|City</th>
            <th>Date</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {donorData.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{bloodGroups[donor.blood_group] || "Unknown"}</td>
              <td>
                {donor.state} | {donor.city}
              </td>
              <td>{donor.date}</td>
              <td>{action}</td>
              <td className="d-flex">
                <Button
                  onClick={() => handleShowModal(donor)} // Pass the donor object correctly
                  className="btn-sm"
                  variant="outline-info"
                >
                  View
                </Button>
                <Button
                  onClick={() => handleDelete(donor.id)} // Pass the donor.id for deletion
                  className="btn-sm ms-2"
                  variant="outline-danger"
                >
                  Delete
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
                <div className="col-12">
                  <img
                    width={300}
                    className="align-item-center"
                    src={selectedDonor.image} // Use appropriate image if available
                    alt={selectedDonor.name}
                  />
                </div>
                <div className="container bg-danger-subtle mt-3">
                  <p className="fw-bold">Name: {selectedDonor.name}</p>
                  <p className="fw-bold">Mobile No: {selectedDonor.phone}</p>
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

export default SeeAllRequest;
