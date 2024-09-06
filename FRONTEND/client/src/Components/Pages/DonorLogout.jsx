import React from "react";

const DonorLogout = () => {
  localStorage.removeItem("DonorLoginStatus");
  window.location.href = "/donor/login";
  return <div></div>;
};

export default DonorLogout;
