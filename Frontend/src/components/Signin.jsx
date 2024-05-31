import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post("http://localhost:8000/user/register", data)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          toast.success("User Registered Successfully");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong")
        console.log("hi" + err);
      });
  };
  // const selectedRole = watch("role");

  return (
    <>
      <h2 className=" text-4xl text-center mt-16">Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className=" w-[90%] md:w-[60%] m-auto mt-10  px-12 ">
          <div className="my-4">
            <label htmlFor="Username">Username*:</label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                id="username"
                placeholder="Username"
                {...register("name", { required: true })}
              />

            </label>
           
              {errors.name && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>

          <div className="my-4">
            <label htmlFor="age">Age*:</label>
            <label className="input input-bordered flex items-center gap-2 mt-1">
              <input
                type="number"
                className="grow"
                id="age"
                placeholder="Age"
                {...register("age", { required: true })}
              />
               
            </label>
          
              {errors.age && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>
          <div className="my-4">
            <label htmlFor="email">Email*:</label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                id="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              
            </label>

              {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>
          <div className="my-4">
            <label htmlFor="mobile">Moblie No:</label>
            <label className="input input-bordered flex items-center gap-2 mt-1">
              <input
                type="number"
                className="grow"
                id="mobile"
                placeholder="Mobile No."
                {...register("mobile", { required: true })}
              />
             
            </label>
          
              {errors.mobile && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>

          <div className="my-4">
            <label htmlFor="address">Address*:</label>
            <label className="input input-bordered flex items-center gap-2 mt-1">
              <input
                type="text"
                className="grow"
                id="address"
                placeholder="Address"
                {...register("address", { required: true })}
              />
              
            </label>
           
              {errors.address && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>

          <div className="my-4">
            <label htmlFor="aadharcardnumber">AadharCardNumber*:</label>
            <label className="input input-bordered flex items-center gap-2 mt-1">
              <input
                type="text"
                className="grow"
                id="addharcardnumber"
                placeholder="Addhar Card Number"
                required
                {...register("aadharCardNumber", { required: true })}
              />
               
            </label>
          
              {errors.aadharCardNumber && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>
          <div className="my-4">
            <label htmlFor="Password">Password*:</label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                id="password"
                placeholder="*******"
                {...register("password", { required: true })}
              />
             
              
            </label>
            {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
          </div>

          <div className="">
            <label htmlFor="role">Role*:</label>
          
         
            <div className="form-control flex">
              <label className="label cursor-pointer">
                <span className="label-text">Admin</span>
                <input
                  type="radio"
                  name="radio-10"
                  value="admin"
                  className="radio checked:bg-red-500"
                  {...register("role", { required: true })}
                
                />
               
                
              </label>
             
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Voter</span>
                <input
                  type="radio"
                  name="radio-10"
                  value="voter"
                  className="radio checked:bg-blue-500"
                  checked
                  {...register("role", { required: true })}
                 
                  
                />
               
            
              </label>
            </div>
          </div>
          <button
            className=" btn text-xs  bg-blue-600 text-white mb-6 mr-1"
            type="submit"
          >
            Register
          </button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
