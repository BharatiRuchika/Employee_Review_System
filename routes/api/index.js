// Importing the 'express' module to create a router
const express = require("express");

// Creating an instance of the router
const router = express.Router();
console.log("router loaded")

// Importing the 'passport' module for authentication
const passport = require("passport");

// Using a sub-router for routes under the '/v1' path, importing routes from './v1'
router.use('/v1',require('./v1'))

// Exporting the router to make it available for use in other files
module.exports = router