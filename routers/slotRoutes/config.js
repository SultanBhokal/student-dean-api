import express from "express";
import { bookSlot, getSlots } from "../../controllers/slot/slotController.js";
import { checkUserSession } from "../../middleware/auth/checkUserSession.js";
import { paramChecker } from "../../middleware/auth/checkParams.js";

const router = express.Router();

router.route("/").get(checkUserSession,getSlots)
router.route("/book").post(paramChecker(["id","purpose"]),checkUserSession,bookSlot)

export default router;