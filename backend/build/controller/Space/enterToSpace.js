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
exports.removeFromSpace = exports.enterToSpace = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const WorkingSpace_1 = __importDefault(require("../../model/WorkingSpace"));
const enterToSpace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { spaceId, userId } = req.body;
    if (!spaceId || !userId) {
        return res.json({
            success: false,
            message: "Requirement Not Satisfied"
        });
    }
    // Check if user is already a member before adding
    const existingSpace = yield WorkingSpace_1.default.findOne({ _id: spaceId, members: userId }).populate("members", "-password").populate("admin", "-password");
    if (existingSpace) {
        return res.json({
            success: true,
            message: "User is already a member",
            data: {
                space: existingSpace
            }
        }); // Exit early if user is already a member
    }
    const addToSpace = yield WorkingSpace_1.default.findOneAndUpdate({
        _id: spaceId
    }, {
        $push: { members: userId }
    }, {
        new: true
    }).populate("members", "-password").populate("admin", "-password");
    if (!addToSpace) {
        const isAdmin = yield WorkingSpace_1.default.findOne({ admin: userId });
        if (isAdmin) {
            return res.json({
                success: true,
                message: "Admin Join the Room"
            });
        }
        return res.json({
            success: false,
            message: "Not Added To Space"
        });
    }
    else {
        return res.json({
            success: true,
            message: "Successfully Added",
            data: { space: addToSpace }
        });
    }
}));
exports.enterToSpace = enterToSpace;
const removeFromSpace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { spaceId, userId } = req.body;
    if (!spaceId || !userId) {
        return res.json({
            success: false,
            message: "Requirement Not Satisfied"
        });
    }
    const exitSpace = yield WorkingSpace_1.default.findOneAndUpdate({
        _id: spaceId
    }, {
        $pull: { members: userId }
    }, {
        new: true
    }).populate("members", "-password").populate("admin", "-password");
    if (!exitSpace) {
        return res.json({
            success: false,
            message: "Not Added To Space"
        });
    }
    else {
        return res.json({
            success: true,
            message: "Successfully Added",
            data: { exitSpace }
        });
    }
}));
exports.removeFromSpace = removeFromSpace;
