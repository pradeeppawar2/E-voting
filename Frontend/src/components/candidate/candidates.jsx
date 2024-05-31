import React from "react";
import Navbar from "../Navbar";
import Candidate from "../Candidate";

export default function candidates() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Candidate />
      </div>
    </>
  );
}
