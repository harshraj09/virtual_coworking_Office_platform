"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workingSpaceSchema = new mongoose_1.default.Schema({
    spaceName: { type: String, required: true },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    numberOfMembers: { type: Number, default: 2 },
}, { timestamps: true });
const WorkingSpace = mongoose_1.default.model("WorkingSpace", workingSpaceSchema);
exports.default = WorkingSpace;
