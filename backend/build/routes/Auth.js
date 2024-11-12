"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginUser_1 = __importDefault(require("../controller/Auth/loginUser"));
const signupUser_1 = __importDefault(require("../controller/Auth/signupUser"));
const router = express_1.default.Router();
router.route("/login").post((req, res) => (0, loginUser_1.default)(req, res));
router.route("/signup").post((req, res) => (0, signupUser_1.default)(req, res));
exports.default = router;
