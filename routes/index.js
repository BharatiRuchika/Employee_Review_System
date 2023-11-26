// Importing the 'express' module to create a router
const express = require("express");

// Creating an instance of the router
const router = express.Router();
console.log("router loaded")

// Importing the 'homeController' module for handling home-related routes
const homeController = require("../controllers/homeController");

// Importing the 'passport' module for authentication
const passport = require("passport");

// Defining a route for the root path ("/") with authentication middleware
router.get("/",passport.checkAuthentication,homeController.home)

// Using a sub-router for routes under the '/api' path, importing routes from './api'
router.use('/api',require('./api'))

// Exporting the router to make it available for use in other files
module.exports = router