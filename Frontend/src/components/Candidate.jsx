import React, { useEffect, useState } from "react";
import Card from "./Card";
import candidates from "../../public/candidateData.json"
import axios from "axios";
import toast from "react-hot-toast";

export default function Candidate() {
  const [candidateList, setCandidateList] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  
  // setTimeout(()=>{
  //   localStorage.removeItem("token")
  //   window.location.href = '/candidate'
  // },24 * 3600000)
 
  useEffect(()=>{
    const getCandidate = async() => {
     try{
      const response = await axios.get("http://localhost:8000/candidate/list")
      console.log(response)
      setCandidateList(response.data)
     }
     catch(error){
      toast.error("Something went wrong")
      console.log(error)
     }
    };
    getCandidate();
   
  },[])
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-16 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20">
        { 
            candidateList.map((candidate, index) => {
                return <Card key={candidate.id} candidate={candidate}/>
            })
        }
           
      </div>
      </div>
      
    </>
  );
}
