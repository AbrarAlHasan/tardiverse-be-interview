import studentDetailsModel from "../models/studentDetails.model.js";

export const findRollNo = (id) =>
  studentDetails.findOne({ rollNo }, { _id: 1 });
