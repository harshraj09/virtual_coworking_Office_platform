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
const Protect_1 = require("../../middleware/Protect");
const WorkingSpace_1 = __importDefault(require("../../model/WorkingSpace"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const showSpaces = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.json({
            success: false,
            message: "You are not Authorized"
        });
    }
    const decodedData = (0, Protect_1.getJwtPayload)(token);
    const adminId = decodedData === null || decodedData === void 0 ? void 0 : decodedData._id;
    const searchQuery = { admin: adminId };
    const spaces = yield WorkingSpace_1.default.find(searchQuery).populate("members").populate("admin", "-password");
    if (!spaces) {
        return res.json({ success: false, message: "Spaces not found" });
    }
    return res.json({ success: true, message: "Spaces found", data: spaces });
}));
exports.default = showSpaces;
