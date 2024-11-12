import { Request, Response, Router } from "express";
import createWorkingSpace from "../controller/Space/createSpace";

const router = Router();

router.route("/create-space").post((req: Request, res: Response) => createWorkingSpace(req, res));

export default router;  