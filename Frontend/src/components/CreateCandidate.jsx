import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function CreateCandidate() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   
    const decodedToken = jwtDecode(authUser);
    console.log(decodedToken.role)

    if (!decodedToken || !decodedToken.role.includes('admin')) {
      toast.error('You are not authorized to create a candidate');
  
      // alert("Only admin can create a candidate");
      return;
    }
    console.log(data);
    await axios
      .post("http://localhost:8000/candidate", data, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      })
      .then((res) => {
        if (res.data) {
          toast.success("Candidate created successfully")
      
        }
        setTimeout(()=>{
          window.location.href = '/';
        },500)
      })
      .catch((err) => {
        toast.error('Something went wrong')
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[90%] md:w-[60%] m-auto mt-10  px-12">
            <h2 className="text-4xl font-bold mb-6">Candidate Registration</h2>
            <div className="my-4">
              <label htmlFor="name">Candidate Name</label>
              <label className="input input-bordered flex items-center gap-2 mt-1">
                <input
                  type="text"
                  className="grow"
                  id="name"
                  placeholder="candidateName"
                  {...register("name", { required: true })}
                />
              </label>
            </div>
            <div className="my-4">
              <label htmlFor="age">Age:</label>
              <label className="input input-bordered flex items-center gap-2 mt-1">
                <input
                  type="number"
                  className="grow"
                  id="age"
                  placeholder="age"
                  {...register("age", { required: true })}
                />
              </label>
            </div>
            {/* <div className="my-4">
              <input type="file" name="partyLogo" />
            </div> */}
            {/* <div className="my-4">
              <input type="file" name="file" id="file" />
            </div> */}
            <div className="my-4">
              <label htmlFor="party">Party Name:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  id="party"
                  placeholder="Party Name..."
                  {...register("party", { required: true })}
                />
              </label>
            </div>
            
            <button type="submit" className="btn bg-blue-500 text-gray-50 mr-3">
              Create Candidate
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
