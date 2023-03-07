import mongoose from "mongoose";
import { findRollNo } from "../utils/findReferenceId.js";

const studentPersonalDetailsSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    // ref: "StudentDetails",
    // validate: {
    //   validator: (rollNo) => findRollNo(rollNo),
    //   message: "RollNo Reference Error",
    // },
  },
  fathersName: {
    type: String,
    required: [true, "Please Provide Your Father Name"],
    min: [3, "Minimum 3 Characters Required"],
  },
  mothersName: {
    type: String,
    required: [true, "Please Provide Your Mothers Name"],
    min: [3, "Minimum 3 Characters Required"],
  },
  city: {
    type: String,
    required: [true, "Please Provide Your City"],
    min: [3, "Minimum 3 Characters Required"],
  },
});

export default mongoose.model(
  "StudentPersonalDetails",
  studentPersonalDetailsSchema
);
