import React from "react";
import { Link } from "react-router-dom";
import sideImage from "../assets/front.jpeg";
import { useAuth } from "../context/AuthProvider";

function LandingPage({ style }) {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
     <div className="md:px-20 flex w-full gap-2 justify-between flex-col md:flex-row my-16 px-8 text-2xl">
      <div className="order-2 md:order-1 w-full md:w-1/2 mt-14 md:mt-32">
        <p>Lorem ipsum dolor sit amet.</p>
        <div className="text-green-700">Vote Today.</div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
          sed, deleniti ratione pariatur earum similique hic architecto
          numquam eum velit.
        </div>
        {!authUser && (
          <button className="btn bg-green-800 text-white mt-3">
            <Link to="register">REGISTER</Link>
          </button>
        )}
      </div>
      <div className="order-1 w-full md:w-1/2 mt-12 md:mt-10 flex justify-center md:justify-end ">
        <img className="w-96" src={sideImage} alt="Side" />
      </div>
    </div>
    </>
  );
}

export default LandingPage;
