// Importing the Review model
const Review = require('../../../models/review')

// Controller function for rendering the feedback form
module.exports.feedbackForm = async (req, res) => {
    try {
      console.log('userId',req.user.id)
      // Finding the review by ID and populating related user details
      let review = await Review.findById(req.body.reviewId).populate("for_user").populate("from_user");
     
    console.log('review',review)
    // Rendering the "feedbackForm" view with the populated review details
    return res.render("feedbackForm", {
        layout: false,
        review: review,
      });
    } catch (error) {
      console.log(error);
      return "";
    } 
};

// Controller function for updating feedback
module.exports.updateFeedback = async (req, res) => {
    try {
      let reviewStatus = "Submitted";
       // Checking if feedback is not provided, set status to "Pending"
      if (!req.body.feedback) reviewStatus = "Pending";
      console.log('review_id',req.body.review_id)

       // Finding the review by ID and updating feedback and status
      let review = await Review.findByIdAndUpdate(req.body.review_id, {
        feedback: req.body.feedback,
        reviewStatus: reviewStatus,
      });
      console.log('review',review)
      // Sending a JSON response with updated details
      return res.status(200).json({
        data: {
          previousStatus: review.reviewStatus,
          reviewStatus: reviewStatus,
          review:review,
          employee: {
            id: req.body.for_user,
            name: req.body.for_user_name,
            email: req.body.for_user_email,
          },
        },
        message: "Feedback Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      // Sending an error response if feedback could not be updated
      return res.status(500).json({
        message: "Feedback could not be Updated",
      });
    }
  };

// Controller function for viewing feedback
  module.exports.viewFeedback = async (req, res) => {
    try {
        console.log('reviewId',req.body.reviewId)
         // Finding the review by ID and populating related user details
      let review = await Review.findById(req.body.reviewId).populate("for_user").populate('from_user');
        console.log('review',review)

        // Rendering the "view-feedback" view with the populated review details
      return res.render("view-feedback", {
        layout: false,
        review: review,
      });

    } catch (error) {
      console.log(error);
      return "";
    }
  };