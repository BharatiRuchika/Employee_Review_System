// Importing the 'express' module to create a router
const express = require("express");

// Creating an instance of the router
const router = express.Router();

// Importing the 'admin_api' module for admin-related actions
const admin_api  = require("../../../controllers/api/v1/admin_api")
console.log("router loaded")

// Importing the 'passport' module for authentication
const passport = require("passport");

// Route for the admin home page, accessible only for authenticated admin users
router.get("/home", passport.checkAdminAuthentication, admin_api.adminHome);

// Route for displaying the form to assign reviewers, accessible only for authenticated admin users
router.post('/assign-reviewers-form',passport.checkAdminAuthentication,admin_api.assignReviewersForm)

// Route for assigning reviewers, accessible only for authenticated admin users
router.post('/assign-reviewers',passport.checkAdminAuthentication,admin_api.assignReviewers)

// Route for displaying the form to edit a user, accessible only for authenticated admin users
router.post('/edit-user-form',passport.checkAdminAuthentication,admin_api.editUserForm)

// Route for displaying the form to delete a user, accessible only for authenticated admin users
router.post('/delete-user-form',passport.checkAdminAuthentication,admin_api.deleteUserForm)

// Route for updating user information, accessible only for authenticated admin users
router.post('/update-user',passport.checkAdminAuthentication,admin_api.updateUser)

// Route for deleting a user, accessible only for authenticated admin users
router.post('/delete-user',passport.checkAdminAuthentication,admin_api.deleteUser)

// Route for displaying the form to add a new user, accessible only for authenticated admin users
router.get("/add-user-form", passport.checkAdminAuthentication, admin_api.addUserForm);

// Route for creating a new user, accessible only for authenticated admin users
router.post("/create-user", passport.checkAdminAuthentication, admin_api.createUser);

// Exporting the router to make it available for use in other files
module.exports = router