const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    dob: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    isDeleted:{
        type:Boolean,
        default:undefined
    },
    deletedAt:{
        type:Date,
        default:undefined
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
