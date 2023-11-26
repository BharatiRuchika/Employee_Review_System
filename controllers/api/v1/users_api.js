// Importing the User and Review models
const User = require('../../../models/users')
const Review = require('../../../models/review')

// Controller function to get user details by ID
module.exports.getUser = async function(req,res){
    try{
        console.log('im in sign in')
        console.log('id',req.params.id)
        // Finding a user by their ID in the User model
        const user = await User.findById(req.params.id)

        // Rendering the 'user' view with user details
        return res.render('user',{
            title:"ERS | user",
            user:user
        })
    }catch(error){
        console.log('error',error)
    }
}

// Controller function for the user home page
module.exports.userHome = async function(req,res){
    try{
        console.log('authenticated')
        // Finding pending and submitted reviews for the current user
        let pending_reviews = await Review.find({
        from_user: req.user.id,
        reviewStatus: "Pending",
      }).populate("for_user");
      let submitted_reviews = await Review.find({
        from_user: req.user.id,
        reviewStatus: "Submitted",
      }).populate("for_user");
     
         // Rendering the 'userHome' view with review details
        return res.render('userHome', {
          title: "userHome",
          pending_reviews,
          submitted_reviews
        })
    }catch(error){
        console.log('error',error)
    }
}

// Controller function for user sign-out
module.exports.signOut = (req, res) => {
  // Logging out the user and handling errors
    req.logout(function (error) {
      if (error) {
        console.log(error);
        req.flash("error", "User could not be Signed Out");
        return res.redirect("/");
      }
      req.flash("success", "You have Logged Out");
      return res.redirect("/");
    });
  };