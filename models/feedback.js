const mongoose = require("mongoose");

const feedbackFormSchema = new mongoose.Schema({
    questions:[{
        type:String,
        required:true
    }],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

const FeedbackForm = mongoose.model('FeedbackForm', feedbackFormSchema);

module.exports = FeedbackForm;