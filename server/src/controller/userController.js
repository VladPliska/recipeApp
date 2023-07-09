const UsersModel = require("../models/userModel.js");
require('dotenv').config();

const JWT = require("jsonwebtoken");
const bcyrpt = require("bcrypt");

const express=require("express");
const mongoose=require("mongoose");

//--------------------------------------------------------------------------------------------------------------------------------


//_______signUp controller_______
exports.signUp = async (req, res) => {
  const { username, password } = req.body;  //get username and password from req.body
  const user = await UsersModel.findOne({ username });

  //if user exists (based on username)
  if (user) {
    return res.json({ message: "User already exists" });
  }
  //if not then save newUser in DB, create new user with the help of model  //and add hashed password in DB
  const hashedPassword = await bcyrpt.hash(password, 10);
  const newUser = new UsersModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "New user saved in DB" });
};


//--------------------------------------------------------------------------------------------------------------------------------

//_____Login/signIn controller_______
exports.signIn = async (req, res) => {
    const{username,password}=req.body;
    const user=await UsersModel.findOne({username});
    //if user not present, username not matched with any username in DB
    if(!user){
        return res.json({message:"user does not exists in DB"});
    }
    //checked hashed password present in db with hashed password of currently entered plain password
    const isValidPassword=await bcyrpt.compare(password, user.password);
    if (!isValidPassword) {
        return res
          .status(400)
          .json({ message: "Username or password is incorrect" });
      }
      //create JWT token, sign JWT token(sign some data)
      const token=JWT.sign( {id : user._id} , process.env.SECRET );
      res.json({token, userId:user._id});
};


//--------------------------------------------------------------------------------------------------------------------------------


// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     JWT.verify(authHeader, process.env.SECRET , (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };


exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verify the token
    JWT.verify(token, process.env.SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
