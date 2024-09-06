import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [donorCounts, setDonorCounts] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);

  // Fetch blood groups and donor counts
  useEffect(() => {
    const fetchBloodGroups = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/blood-groups/"
        );
        setBloodGroups(response.data.map((group) => group.name));
      } catch (error) {
        console.error("Error fetching blood groups", error);
      }
    };

    fetchBloodGroups();
  }, []);

  useEffect(() => {
    if (bloodGroups.length > 0) {
      const fetchDonorCounts = async () => {
        try {
          const counts = await Promise.all(
            bloodGroups.map(async (group) => {
              const response = await axios.get(
                `http://127.0.0.1:8000/api/donor-count/${encodeURIComponent(
                  group
                )}/`
              );
              return { group, totalDonors: response.data.total_donors };
            })
          );
          setDonorCounts(counts);
        } catch (error) {
          console.error("Error fetching donor counts", error);
        }
      };

      fetchDonorCounts();
    }
  }, [bloodGroups]);

  const DonorLoginStatus = localStorage.getItem("DonorLoginStatus");
  if (DonorLoginStatus != "true") {
    window.location.href = "/donor/login";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {donorCounts.map((donor, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card
              className="px-4 border-1 border-danger"
              style={{ width: "100%" }}
            >
              <Card.Body className="text-center">
                <h3 className="text-center">🩸</h3>
                <Card.Title>Blood Group: {donor.group}</Card.Title>
                <Card.Title>Total Donor: {donor.totalDonors}</Card.Title>
                <Card.Link
                  as={Link}
                  to={`/donor/details/${encodeURIComponent(donor.group)}`}
                  className="btn btn-outline-danger my-3 px-3"
                >
                  View All Donors
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
