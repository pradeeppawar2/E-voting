import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    const userInfo = {
      aadharCardNumber: data.aadharCardNumber,
      password: data.password,

    }
    

    await axios.post("http://localhost:8000/user/login",userInfo).then((res)=>{
      if(res.data){
        console.log(res.data);
        // console.log("login Successfully")
        toast.success("Login Successfully")

        localStorage.setItem("token",res.data.token)
     
        setTimeout(()=>{
          window.location.href = '/';
        },500)
        // setTimeout(()=>{
        //   localStorage.removeItem("token")
        // },5000)
        
      
        // Adjust timing if needed
      }
    }).catch((err)=>{
      toast.error("Something went wrong")
      console.log(err);
    })
    };

  return (
    <>
       
    <form onSubmit={handleSubmit(onSubmit)} >
    <div className="w-[90%] md:w-[60%] m-auto mt-10  px-12">
      <h2 className="text-4xl font-bold mb-6">Login</h2>
        <div className="my-4">
          <label htmlFor="aadharcardnumber">AadharCardNumber*:</label>
          <label className="input input-bordered flex items-center gap-2 mt-1">
            <input
              type="text"
              className="grow"
              id="addharcardnumber"
              placeholder="Addhar Card Number"
              {...register("aadharCardNumber", {required: true})}
            />
          </label>
        </div>
        <div className="my-4">
          <label htmlFor="Password">Password*:</label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              id="password"
              placeholder="*******"
              {...register("password", {required: true})}
            />
          </label>
        </div>
        <button type="submit" className="btn bg-blue-500 text-gray-50 mr-3">Login</button>
        <span>
            Not an account? <Link to="/register" className="text-blue-500">Register</Link>


        </span>
      </div>
    </form>
    </>
  );
}
