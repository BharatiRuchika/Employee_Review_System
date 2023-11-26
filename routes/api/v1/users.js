// Importing the 'express' module to create a router
const express = require("express");

// Creating an instance of the router
const router = express.Router();

// Importing the 'users_api' module for handling user-related API routes
const users_api  = require("../../../controllers/api/v1/users_api")
console.log("router loaded")

// Importing the 'passport' module for authentication
const passport = require("passport");

// Route to get user details by ID, with admin authentication check
router.get('/getUser/:id',passport.checkAdminAuthentication,users_api.getUser)

// Route for user home, with employee authentication check
router.get('/home',passport.checkEmployeeAuthentication,users_api.userHome)

// Route for user sign-out
router.get('/sign-out',users_api.signOut)

// Exporting the router to make it available for use in other files
module.exports = router