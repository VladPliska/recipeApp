const express=require("express");
const router=express.Router();

const { signUp, signIn }=require("../controller/userController.js");

router.post("/register", signUp);
router.post("/login", signIn);


module.exports =router;
