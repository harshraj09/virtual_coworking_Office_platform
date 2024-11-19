import {Request, Response, Router } from "express";
import createWorkingSpace from "../controller/Space/createSpace";
import protect from "../middleware/Protect";
import showSpaces from "../controller/Space/showSpaces";
import {enterToSpace, removeFromSpace} from "../controller/Space/enterToSpace";
import sendSpaces from "../controller/Space/sendSpaces";

const router = Router();

router.route("/create-space").post((req: Request, res: Response) => createWorkingSpace(req, res));

router.route("/show-spaces").get(protect, showSpaces);
router.route("/joinspace").put(protect,enterToSpace);
router.route("/exitspace").put(protect,removeFromSpace);
router.route("/space/:spaceId").get(protect,sendSpaces);

export default router;