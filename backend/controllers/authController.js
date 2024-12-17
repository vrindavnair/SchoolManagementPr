const User = require("../models/User.js");
const sendToken = require("../service/sendToken.js");

// user registration
 const userRegister = async (req, res) => {
  try {
    const { password, email } = req.body;
    const emailAlreadyExists = await User.findOne({ email: email });
    if (emailAlreadyExists) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }
    const newUser = await User.create({
      password: password,
      email: email,
    });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// user login
const userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    // Send token and return user data including role
    sendToken(user, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
};