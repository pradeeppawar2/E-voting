import React from "react";
import toast from "react-hot-toast";

export default function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout(() => {
      window.location.reload();
    },1000);
  };
  return (
    <>
      <div>
        <button className=" btn btn-md rounded-md   bg-blue-500 text-gray-100  " onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
