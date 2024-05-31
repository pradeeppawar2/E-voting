const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { jwtAuthMiddleware, generateToken } = require("../config/jwtAuth");


//user model
const User = require("../models/user");


router.get("/login", (req, res) => {
  res.send("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

//regisster handle
router.post("/register", async (req, res) => {
  try {
    const users = await User.find();
    const adminExists = users.some((user) => user.role === "admin");

    let data = req.body;
   
  if(data.role == "admin" && adminExists){
    return res.status(401).send("Admin already exists.");
  }
 
  if(!data.aadharCardNumber.length == 12){
      return res.status(401).send("Aadhar Card Number must be 12")
  }
  if(!data.password.length > 6){
      return res.status(401).send("Password must be greater than 6")
    }

    await User.findOne({ aadharCardNumber: data.aadharCardNumber }).then(
      (user) => {
        if (user) {
          console.log("user Exist");
          return res.status(400).json({ msg: "User already exists" });
        } else {
          //generate new user
          const newUser = new User(data);
       
          //hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
              //if error occured while hashing
              if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ msg: "Error hashing password" });
              }

              //save this to database
              newUser.password = hash;

              if (newUser.role === "admin" && adminExists) {
                // const response = await newUser.save();
                return res.status(401).send("Admin already exists.");
                // res.status(200).json(response);
              }
              const response = await newUser.save();
           
     
              const payload = {
                id: response.id,
                name: response.name,
                role: response.role,
               
              };
              // If user is successfully saved, generate token
              const token = generateToken(payload);
              return res.json({
                msg: `User created! ${response.name} is registered and can log in.`,
                response: response,
                token: token, // You can include the token in the response if needed
              });
            });
          });
        }
      }
    );
  } catch (e) {
    console.log("user2" + e);
    res.status(500).json({ msg: "Internal server error." });
  }
});
//login handle
router.post("/login", async (req, res, next) => {
  try {
    // Extract aadharCardNumber and password from request body
    const { aadharCardNumber, password } = req.body;

    // Check if aadharCardNumber or password is missing
    if (!aadharCardNumber || !password) {
      return res
        .status(400)
        .json({ error: "aadharCardNumber and password are required" });
    }
    console.log(aadharCardNumber,password)

    // Find the user by aadharCardNumber
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    // If user does not exist, return error
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid aadharCardNumber or password" });
    }

    // Compare the provided password with the stored password hash
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(result);
      // If passwords don't match, return error
      if (!result) {
        return res
          .status(401)
          .json({ message: "Invalid aadharCardNumber or password" });
      }

      // Passwords match, generate token and send it in response
      const payload = {
        id: user.id,
        role: user.role,
        voted: user.isVoted

      
      };
      const token = generateToken(payload);
      res.json({ token });
    });
  } catch (err) {
    console.error("user" + err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// profile
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).send("The user is not found");
  }
  res.send(user);
});

//password change
router.put("/profile/update",jwtAuthMiddleware, async (req, res) => {
 try{
  const user = await User.findById(req.user.id);

  // console.log(userID)
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Both currentPassword and newPassword are required" });
  }
  const compare = await  bcrypt.compare(currentPassword, user.password);
  if(!compare){
    return  res.status(401).json({message:"Incorrect Current Password"})
  }
  else{
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, async (err, hash) => {
        //if error occured while hashing
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ msg: "Error hashing password" });
        }

        //save this to database
        user.password = hash;
        await user.save();
        res.json({msg:'Password Updated'});
      });
    })
  }
 }
 catch(err){
  console.log(err);
  return res.status(500).json({ msg: "Server Error" });
 }
});

//delete route
// router.delete('/profile/:userId', jwtAuthMiddleware ,async (req,res)=>{
//    let userId=req.p.id;
//    let deleteUser =await User.findOneAndRemove({_id : userId});
//    if(!deleteUser){
//      return res.status(400).json({msg:"No such user found!"})
//    }else{
//      res.json({msg:`${deleteUser.username} deleted successfully`});
//    }
// });

//Logout Handle
// router.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) throw err;
//     req.flash("success_msg", "You are logged out");
//     res.redirect("/users/login");
//   });
// });

module.exports = router;
