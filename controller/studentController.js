import studentDetails from "../models/studentDetails.model.js";
import studentPersonalDetails from "../models/studentPersonalDetails.model.js";
import otpGenerator from "otp-generator";

export const addStudentDetails = async (req, res) => {
  try {
    const { rollNo, name, email } = req.body;
    const newStudent = new studentDetails({
      rollNo,
      name,
      email,
    });
    await newStudent.save();
    return res.status(200).json("New Student Added");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const addStudentPersonalDetails = async (req, res) => {
  try {
    const { rollNo, fathersName, mothersName, city } = req.body;
    const result = await studentDetails.findOne({ rollNo }, { _id: 1 }).exec();
    console.log(result);
    const checkStudentPersonal = await studentPersonalDetails
      .findOne({ rollNo }, { _id: 1 })
      .exec();

    if (checkStudentPersonal || !result)
      return checkStudentPersonal
        ? res.status(500).json("Student Detail is already Present")
        : res.status(500).json("Student RollNo reference Error");
    const newStudentDetail = new studentPersonalDetails({
      rollNo,
      fathersName,
      mothersName,
      city,
    });
    await newStudentDetail.save();
    return res.status(200).json("Student Persnoal Details Added");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getStudentDetails = async (req, res) => {
  const { rollNo } = req.params;
  const rollNumber = Number(rollNo);
  const pipeline = [];
  try {
    const details = await studentDetails.aggregate([
      {
        $match: {
          rollNo: rollNumber,
        },
      },
      {
        $lookup: {
          from: "studentpersonaldetails",
          localField: "rollNo",
          foreignField: "rollNo",
          as: "personalDetails",
        },
      },
      {
        $addFields: {
          fathersName: { $arrayElemAt: ["$personalDetails.fathersName", 0] },
          mothersName: { $arrayElemAt: ["$personalDetails.mothersName", 0] },
          city: { $arrayElemAt: ["$personalDetails.city", 0] },
        },
      },
      {
        $project: {
          personalDetails: 0,
        },
      },
    ]);

    return res.status(200).json(details);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const generateOTP = async (req, res) => {
  const otp = await otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  return res.status(201).json(otp);
};
