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
const User_1 = __importDefault(require("../../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }
    try {
        const userExists = yield User_1.default.findOne({ email });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }
        const user = yield User_1.default.create({ name, email, password: hashedPassword, avatar: name });
        if (!user) {
            return res.json({ success: false, message: "User not created" });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET);
        return res.json({
            success: true,
            message: "Signup successful",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    position: user.postion
                }
            }
        });
    }
    catch (err) {
        return res.json({ success: false, message: "Internal server error" });
    }
});
exports.default = signupUser;
