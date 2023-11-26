// Importing the 'express' module to create a router
const express = require("express");

// Creating an instance of the router
const router = express.Router();

// Importing the 'auth_api' module for authentication-related actions
const auth_api = require("../../../controllers/api/v1/auth_api")
console.log("router loaded")
// Importing the 'passport' module for authentication
const passport = require("passport");

// Route for sign-in page
router.get('/sign-in',auth_api.sign_in)

// Route for sign-up page
router.get('/sign-up',auth_api.sign_up)

// Route for creating a new user
router.post('/create',auth_api.create)

// Route for creating a user session (authentication)
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'},),
auth_api.createSession)

// Exporting the router to make it available for use in other files
module.exports = router