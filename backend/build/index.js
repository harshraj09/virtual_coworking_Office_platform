"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const WorkSpace_1 = __importDefault(require("./routes/WorkSpace"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", Auth_1.default);
app.use("/api", WorkSpace_1.default);
app.post("/", (req, res) => {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
});
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
