import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbars from "./Components/Navbars";
import DonorLoginpage from "./Components/Pages/DonorLoginpage";
import DonorRegister from "./Components/Pages/DonorRegister";
import ViewDonors from "./Components/Pages/ViewDonors";
import RequestBoold from "./Components/Pages/RequestBoold";
import SeeAllRequest from "./Components/Pages/SeeAllRequest";
import Dashboard from "./Components/Pages/Dashboard";
import Homepage from "./Components/Pages/Homepage";
import Footers from "./footers";
import DonorLogout from "./Components/Pages/DonorLogout";

const App = () => {
  return (
    <>
      <Router>
        <Navbars />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="donor/login" element={<DonorLoginpage />} />
          <Route path="donor/logout" element={<DonorLogout />} />
          <Route path="donor/register" element={<DonorRegister />} />
          <Route path="donor/details/:group" element={<ViewDonors />} />
          <Route path="blood/request/" element={<RequestBoold />} />
          <Route path="all-doners/request/" element={<SeeAllRequest />} />
        </Routes>
        <Footers />
      </Router>
    </>
  );
};

export default App;
