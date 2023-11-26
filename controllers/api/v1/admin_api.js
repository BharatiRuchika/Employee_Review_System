// Importing User and Review models
const User = require('../../../models/users')
const Review = require('../../../models/review')

// Controller function for rendering assign reviewers form
module.exports.assignReviewersForm = async (req, res) => {
    console.log('im in assignReviewersForm')
    try {
       // Finding the employee and potential reviewers
      let employee = await User.findById(req.body.employee_id);
      let reviewers = await User.find({
        _id: { $nin: employee.reviewers, $ne: employee.id },
        role:{$nin: 'Admin'}
      });

       // Rendering the "assign-reviewers" view with employee and reviewers data
      return res.render("assign-reviewers", {
        layout: false,
        employee: employee,
        reviewers: reviewers,
      });
    } catch (error) {
      console.log(error);
      return "";
    }
};

// Controller function for rendering admin home
module.exports.adminHome = async (req,res) => {
    try{
      // Finding all users, pending reviews, and submitted reviews
        const all_users = await User.find({})
        console.log('authenticated')
        let pending_reviews = await Review.find({
        reviewStatus: "Pending",
      }).populate("for_user");
      let submitted_reviews = await Review.find({
        reviewStatus: "Submitted",
      }).populate("for_user");
     
       // Rendering the "home" view with user data and review details
        return res.render('home', {
          title: "adminHome",
          users:all_users,
          pending_reviews,
          submitted_reviews
        })
    }catch(error){
        console.log('error',error)
    }
}


// Controller function for assigning reviewers to an employee
module.exports.assignReviewers = async (req, res) => {
    try {
      let reviewer_ids = req.body.reviewers;

      // Creating review records for each selected reviewer
      let records = await reviewer_ids.map((reviewer) => {
        return {
          for_user: req.body.employee_id,
          from_user: reviewer,
        };
      });
      console.log('records',records)
      // Inserting review records into the database
      await Review.insertMany(records);

      // Updating the employee's reviewers array
      await User.findByIdAndUpdate(req.body.employee_id, {
        $push: { reviewers: { $each: reviewer_ids } },
      });

      // Redirecting to the home page
      return res.redirect('/')
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  };

// Controller function for rendering the edit user form
module.exports.editUserForm = async (req, res) => {
    try {
      // Finding the user by ID
      let user = await User.findById(req.body.user_id);

       // Rendering the "edit-user" view with user data
      return res.render("edit-user", {
        layout: false,
        user: user,
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  };

// Controller function for rendering the delete user form
  module.exports.deleteUserForm = async (req, res) => {
    console.log('im in deleteUserForm')
    try {
      // Finding the user by ID
      let user = await User.findById(req.body.user_id);
      console.log('user',user)

      // Rendering the "delete-user" view with user data
      return res.render("delete-user", {
        layout: false,
        user: user,
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  };

// Controller function for updating user details
module.exports.updateUser = async (req, res) => {
    try {
      // Finding and updating the user by ID
      let user = await User.findByIdAndUpdate(
        req.body.user_id,
        req.body,
        { new: true }
      );

// Redirecting to the home page
    return res.redirect('/')
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "User could not be Updated",
      });
    }
  };

// Controller function for deleting a user
  module.exports.deleteUser = async (req, res) => {
    try {
        console.log('im in delete user')
         // Deleting user and associated reviews
        await User.findByIdAndDelete(req.body.user_id);
        await Review.deleteMany({
            $or: [
            { from_user: req.body.user_id },
            { for_user: req.body.user_id },
            ],
        });

        // Removing the deleted user from the reviewers array of other users
        await User.updateMany({ $pull: { reviewers: req.body.user_id } });

        // Redirecting to the home page
        return res.redirect('/')
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "User could not be Removed",
      });
    }
  };

  // Controller function for rendering the add user form
  module.exports.addUserForm = async (req, res) => {
     // Rendering the "add-user" view
    return res.render("add-user", {
      layout: false,
    });
  };

 // Controller function for creating a new user
  module.exports.createUser = async (req, res) => {
    try {
       // Checking if password and confirm_password match
      if (req.body.password != req.body.confirm_password) {
        return res.status(400).json({
          message: "Password and Confirm Password not Same",
        });
      }

      // Checking if a user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          message: "User already exists with this Email",
        });
      }
  
      // Creating a new user
      user = await User.create(req.body);
      console.log('user',user)

      // Sending a JSON response with user data
      return res.status(200).json({
        data: {
            user: user,
        },
        message: "User Created Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "User could not be Created",
      });
    }
  };