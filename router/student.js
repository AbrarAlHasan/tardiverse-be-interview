import { Router } from "express";
import * as controller from "../controller/studentController.js";

const router = new Router();

router.post("/student", controller.addStudentDetails);
router.post("/studentPersonalDetails", controller.addStudentPersonalDetails);
router.get("/studentDetails/:rollNo", controller.getStudentDetails);
router.get("/otp", controller.generateOTP);
export default router;
