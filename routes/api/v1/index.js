// Importing the 'express' module to create a router
const express = require("express");
// Creating an instance of the router
const router = express.Router();
console.log("router loaded")
// Importing the 'passport' module for authentication
const passport = require("passport");
// Route for authentication-related actions
router.use('/auth',require('./auth'))
// Route for user-related actions
router.use('/users',require('./users'))
// Route for admin-related actions
router.use('/admin',require('./admin'))
// Route for review-related actions
router.use('/review',require('./review'))
// Exporting the router to make it available for use in other files
module.exports = router