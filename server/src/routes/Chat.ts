import express, { Request, Response } from "express";
import loginUser from "../controller/Auth/loginUser";
import signupUser from "../controller/Auth/signupUser";
import protect from "../middleware/Protect";
import { createChat } from "../controller/Chat/ChatController";

const router = express.Router();

router.route("/userschats").get(protect, (req: Request, res: Response) => loginUser(req, res));
router.route("/newchat").post(createChat);
router.route("/createMessage").post(protect);
router.route("/deleteMessage").delete(protect);

export default router;
