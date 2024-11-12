import express, { Request, Response } from "express";
import loginUser from "../controller/Auth/loginUser";
import signupUser from "../controller/Auth/signupUser";

const router = express.Router();

router.route("/login").post((req: Request, res: Response) => loginUser(req, res));
router.route("/signup").post((req: Request, res: Response) => signupUser(req, res));

export default router;
