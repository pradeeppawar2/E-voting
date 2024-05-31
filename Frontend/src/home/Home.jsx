import React from "react";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
function Home() {
  // setTimeout(()=>{
  //   localStorage.removeItem("token")
  // },5000)
  return (
    <>
      <div className="">
        <Navbar />
        <div className="bg-cover bg-center min-h-screen">
          <LandingPage />
        </div>
      </div>
    </>
  );
}

export default Home;
