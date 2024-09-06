import React from "react";
import donate from "../../assets/bloods.jpg";
import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic3 from "../../assets/pic3.jpg";
import pic4 from "../../assets/imgs1.jpg";
import pic5 from "../../assets/imgs4.jpeg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Homepage = () => {
  return (
    <>
      <div>
        <img src={donate} width={"100%"} height={"400"} alt="" />
      </div>
      <div className="container mt-5">
        <h3 className="text-center text-danger">DONATION PROCESS</h3>
        <h5 className="text-center">
          The donation process from the time you arraive center until the time
          you leave
        </h5>
        <div className="row mt-5 justify-content-center">
          <div className="col-sm-6 col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={pic5} className="img-fluid" />
              <Card.Body>
                <Card.Title className="text-danger">Registration</Card.Title>
                <Card.Text>
                  You need to complete a very simple Registration form, which
                  contain all required contact information.....
                  {/* to enter in the
                  donation process */}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6 col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={pic3} className="img-fluid" />
              <Card.Body>
                <Card.Title className="text-danger">Screening</Card.Title>
                <Card.Text>
                  A drop of blood from your finger will take for simple test to
                  ensure that your blood iron levels are proper enough for
                  donation process
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6 col-md-4 mb-4">
            <Card>
              <Card.Img
                height={"50"}
                variant="top"
                src={pic4}
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title className="text-danger">Donation</Card.Title>
                <Card.Text>
                  After ensuring and passed screening test successfully you will
                  be directed to a donor bed for donation it will take only 6-10
                  minutes
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
