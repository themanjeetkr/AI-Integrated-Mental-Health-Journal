const express = require('express');
const router=express.Router();
const protect = require("../middlewares/authMiddlewares");
const {
  registerUser,
  login,
  refreshToken,
  logout,
  updateProfile,
  updatePassword,
} = require("../controllers/authController.js");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

module.exports=router
