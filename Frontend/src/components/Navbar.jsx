import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "../components/Logout";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItem = (
    <>
      {" "}
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/candidate">Candidate</Link>
      </li>
      {authUser && jwtDecode(authUser).role == "admin" && (
        <li>
          <Link to={"/createCandidate"}>Create Candidate</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div
        className={` max-w-screen-2xl container mx-auto md:px-20 px-4  fixed top-0 left-0 right-0 z-50 ${
          sticky
            ? " sticky-navbar bg-base-200 shadow-xl duration-300 transition-all"
            : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItem}
              </ul>
            </div>
            <Link to={"/"} className="btn btn-ghost text-xl">
              E-Voting
            </Link>
          </div>
          <div className="navbar-end ">
            <div className="navbar-center hidden lg:flex ">
              <ul className="menu menu-horizontal px-1 mx-3">{navItem}</ul>
            </div>

            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />
            </label>
            {authUser ? (
              <Logout />
            ) : (
              <div>
                <Link
                  to="/login"
                  className="btn-md rounded-md p-2 px-3  bg-blue-500 text-white "
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <FreeBooks item={products}/> */}
    </>
  );
}
