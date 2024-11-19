"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WorkingSpace_1 = __importDefault(require("../../model/WorkingSpace"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../model/User"));
const createWorkingSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { spaceName, numberOfMembers } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.json({ success: false, message: "Invalid Token" });
        }
        const userId = decoded._id;
        const admin = yield User_1.default.findById(userId);
        if (!admin) {
            return res.json({ success: false, message: "You Are Not Logged In." });
        }
        if (!spaceName) {
            return res.json({ success: false, message: "Space name is required" });
        }
        const checkSpace = yield WorkingSpace_1.default.findOne({ spaceName: spaceName });
        if (checkSpace) {
            return res.json({
                success: false,
                message: "Space is Already exist with this Name."
            });
        }
        const workingSpace = yield WorkingSpace_1.default.create({ spaceName, numberOfMembers, admin: userId });
        if (!workingSpace) {
            return res.json({ success: false, message: "Working space not created" });
        }
        const workingSpaceData = yield WorkingSpace_1.default.findById(workingSpace._id).populate("members").populate("admin", "-password");
        if (!workingSpaceData) {
            return res.json({ success: false, message: "Working space not found" });
        }
        return res.json({ success: true, message: "Working space created successfully", data: workingSpaceData });
    }
    catch (err) {
        return res.json({ success: false, message: "Internal server error", error: err.message });
    }
});
exports.default = createWorkingSpace;
