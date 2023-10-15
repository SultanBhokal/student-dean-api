import express from "express";
import { login } from "../../controllers/auth/usersController.js";
import { paramChecker } from "../../middleware/auth/checkParams.js";
const router = express.Router()

router.route("/login").post(paramChecker(["enroll","pass"]),login)


export default router;