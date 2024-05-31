const express = require("express");
const router = express.Router();

//user model
const Candidate = require("../models/candidate");
const User = require("../models/user");
const { jwtAuthMiddleware } = require("../config/jwtAuth");



const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role == "admin") {
      console.log("your admin");
      return true;
    }
  } catch (err) {
    console.log("Error in checking candidate: ", err);
    return false;
  }
};

router.get("/",async(req,res)=>{
  res.send("hi from candidate")
})
//candidate handle
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user does not have admin role" });

    let data = req.body;

    //generate new user
    const newCandidate = new Candidate(data);
    //save this user to the database
    const response = await newCandidate.save();
    console.log(response)

    //return json format of the user
    res.status(200).json({ response: response });
  } catch (e) {

    console.log(e)
   
  }
});

router.put("/:candidateId", async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user does not have admin role" });

    const candidateId = req.params.candidateId;
    const updateCandidateData = req.body;
    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updateCandidateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      res.status(404).send("No candidate with  given id was found!");
    }
    console.log("updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/:candidateId', async(req,res) =>{
  try{
    const candidateId = req.params.candidateId;

  const response = await Candidate.findByIdAndDelete(candidateId);
  if(!response){
    return res.status(404).json('No candidate with the provided ID was found!')
  }

  console.log("deleted")
  res.status(200).json({message: "deleted", response: response});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:'Server error'})
  }

})

router.post("/vote/:candidateId", jwtAuthMiddleware, async (req,res) => {
  const candidateID = req.params.candidateId;
  const userID = req.user.id;

  try{
    const candidate = await Candidate.findById(candidateID);
    if(!candidate){
      res.status(403).json("Candidate not found.");
    }
    const user = await User.findById(userID);
    if(user.role == 'admin'){
      return res.status(401).send("You do not have permission to vote as an admin.")
    }
    if(user.isVoted == true){
      return res.status(409).json("User has already voted");
    }
    
    candidate.votes.push({user: userID});
    candidate.voteCount++;
    await candidate.save();

    user.isVoted = true;
    await user.save();


    res.status(200).json({ message: "vote recorded succesfully"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:'Server error'})
  }

})
router.get("/vote/count", async (req,res) =>{
  try{
    const candidate = await Candidate.find().sort({voteCount : "desc"});

    const voteRecord = candidate.map((data) =>{
      return{
        name: data.name,
        party: data.party,
        count: data.voteCount
      }
    })
    return  res.status(200).json(voteRecord);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:'Server error'})
  }
})

router.get("/list", async(req,res) =>{
  try{
    const candidates = await Candidate.find({});
  if(!candidates) {
    return res.status(404).json({message:"No candidate found!"})
  }
  const candidateList = candidates.map((candidate) =>{
    return{
      id: candidate._id,
      name: candidate.name,
      party: candidate.party,
      age: candidate.age,
      count: candidate.votes
    }
  })
  return res.status(200).json(candidateList);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:'Server error'})
  }
  
})

module.exports = router;
