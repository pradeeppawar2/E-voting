
// import Candidate from "./components/Candidate";
import Candidates from "./components/candidate/candidates";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Home from "./home/Home";


import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// import { useAuth } from './context/authContext';
import {useAuth} from "./context/AuthProvider"
import CreateCandidate from "./components/CreateCandidate";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "react-hot-toast";


const AppRoutes = () => {
  const [authUser, setAuthUser] = useAuth();
  setTimeout(()=>{
    localStorage.removeItem("token")
    window.location.href = '/'
  },720000)
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/register', element: <Signin /> }, 
    { path: '/login', element: <Login /> },
     { path: '/candidate', element: authUser? <Candidates /> : <Navigate to="/login" /> },
    { path: '/createcandidate', element: authUser && jwtDecode(authUser).role == 'admin'? <CreateCandidate />: <Navigate to="/" /> },


  ]);
  return routes;
  };

  const App = () => {
    return (
     <>
   
     <AppRoutes />
     <Toaster />
     </>
    );
  };
  

export default App;
