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
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const userId = decoded._id;
    console.log(userId);
    try {
        const admin = yield User_1.default.findById(userId);
        if (!admin) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!spaceName) {
            return res.status(400).json({ success: false, message: "Space name is required" });
        }
        const workingSpace = yield WorkingSpace_1.default.create({ spaceName, numberOfMembers, admin: userId });
        if (!workingSpace) {
            return res.status(400).json({ success: false, message: "Working space not created" });
        }
        const workingSpaceData = yield WorkingSpace_1.default.findById(workingSpace._id).populate("members").populate("admin", "-password");
        if (!workingSpaceData) {
            return res.status(400).json({ success: false, message: "Working space not found" });
        }
        return res.status(201).json({ success: true, message: "Working space created successfully", data: workingSpaceData });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.default = createWorkingSpace;
