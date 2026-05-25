const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function publicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered successfully",
      token: createToken(user._id),
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.json({ token: createToken(user._id), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords are required" });
    }

    const user = await User.findById(req.user._id);
    const matches = await bcrypt.compare(currentPassword, user.password);

    if (!matches) {
      return res.status(400).json({ message: "Current password is wrong" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
