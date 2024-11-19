"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSpace_1 = __importDefault(require("../controller/Space/createSpace"));
const Protect_1 = __importDefault(require("../middleware/Protect"));
const showSpaces_1 = __importDefault(require("../controller/Space/showSpaces"));
const enterToSpace_1 = require("../controller/Space/enterToSpace");
const sendSpaces_1 = __importDefault(require("../controller/Space/sendSpaces"));
const router = (0, express_1.Router)();
router.route("/create-space").post((req, res) => (0, createSpace_1.default)(req, res));
router.route("/show-spaces").get(Protect_1.default, showSpaces_1.default);
router.route("/joinspace").put(Protect_1.default, enterToSpace_1.enterToSpace);
router.route("/exitspace").put(Protect_1.default, enterToSpace_1.removeFromSpace);
router.route("/space/:spaceId").get(Protect_1.default, sendSpaces_1.default);
exports.default = router;
