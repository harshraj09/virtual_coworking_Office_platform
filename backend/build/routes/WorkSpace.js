"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSpace_1 = __importDefault(require("../controller/Space/createSpace"));
const router = (0, express_1.Router)();
router.route("/create-space").post((req, res) => (0, createSpace_1.default)(req, res));
exports.default = router;
