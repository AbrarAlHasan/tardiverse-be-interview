import mongoose from "mongoose";

const studentDetailsSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: [true, "Please Provide Your RollNo"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Please Provide Your Name"],
    min: [3, "Minimum 3 Characters Required"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    min: [3, "Minimum 3 Characters Required"],
  },
});

export default mongoose.model("StudentDetails", studentDetailsSchema);
