const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
const userSchema = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Employee"],
      default: "Employee",
    },
    reviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hashSync(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("thisPassword",this.password);
  console.log("enteredPassword",enteredPassword);
  console.log('isSame',bcrypt.compareSync(enteredPassword, this.password))
  return await bcrypt.compareSync(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User;
