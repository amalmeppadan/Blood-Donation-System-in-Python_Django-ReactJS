import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import dp from "../assets/dp.jpg";

const Navbars = () => {
  const DonorLoginStatus = localStorage.getItem("DonorLoginStatus");
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-danger text-white position-sticky top-0"
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="text-white fw-normal  fs-3">
          <img src={dp} width={"50"} className="border-circle" alt="" /> Blood
          Donation System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              style={{ fontSize: "18px", fontWeight: "400" }}
              className="text-white md-text-12 "
              as={Link}
              to={"/"}
            >
              Home
            </Nav.Link>
            <NavDropdown
              title={
                <span
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  Services
                </span>
              }
              id="basic-nav-dropdown"
            >
              {DonorLoginStatus == "true" && (
                <>
                  <NavDropdown.Item as={Link} to={"/dashboard"}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/blood/request/"}>
                    Request for Blood
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/all-doners/request/"}>
                    See all request donor
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/donor/logout"}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}

              {DonorLoginStatus != "true" && (
                <>
                  <NavDropdown.Item as={Link} to={"donor/login"}>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"donor/register"}>
                    Register
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
