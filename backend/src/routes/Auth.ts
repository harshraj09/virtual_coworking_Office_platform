import express, { Request, Response } from "express";
import loginUser from "../controller/Auth/loginUser";
import signupUser from "../controller/Auth/signupUser";
import protect from "../middleware/Protect";

const router = express.Router();

router.route("/login").post((req: Request, res: Response) => loginUser(req, res));
router.route("/signup").post((req: Request, res: Response) => signupUser(req, res));
router.route("/dashboard").get(protect, (req:Request, res:Response):any => {
    return res.json({
        success : true,
        message : "You are Autorized"
    })
});

export default router;
