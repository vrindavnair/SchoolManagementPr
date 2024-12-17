const express  = require("express")
const {  userLogin, userRegister } = require('../controllers/authController.js');


const userRoutes = express.Router();

userRoutes.post("/user-register", userRegister)
userRoutes.post("/user-login", userLogin)

module.exports = userRoutes;