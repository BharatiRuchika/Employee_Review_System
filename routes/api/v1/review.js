// Importing the 'express' module to create a router
const express = require("express");

// Creating an instance of the router
const router = express.Router();

// Importing the 'review_api' module for handling review-related API routes
const review_api  = require("../../../controllers/api/v1/review_api")
console.log("router loaded")
// Importing the 'passport' module for authentication
const passport = require("passport");
// Route to handle the submission of feedback form, with authentication check
router.post('/feedback-form',passport.checkAuthentication,review_api.feedbackForm)

// Route to handle the update of feedback, with authentication check
router.post('/update-feedback',passport.checkAuthentication,review_api.updateFeedback)

// Route to handle the viewing of feedback, with authentication check
router.post('/view-feedback',passport.checkAuthentication,review_api.viewFeedback)

module.exports = router