const express = require('express');
const router=express.Router();
const protect = require("../middlewares/authMiddlewares");
const {
  registerUser,
  login,
  updateProfile,
  updatePassword,
}=require("../controllers/authController.js")
router.post("/register",registerUser)
router.post("/login",login)
router.put("/profile", protect, updateProfile)
router.put("/password", protect, updatePassword)
module.exports=router
