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
const UserJoin_1 = __importDefault(require("./UserJoin"));
class SocketInstance {
    constructor(io) {
        this.io = io;
        this.socketInit();
    }
    socketInit() {
        this.io.on("connection", (socket) => {
            socket.on("join:request", (_a) => __awaiter(this, [_a], void 0, function* ({ userId, spaceId }) {
                const newUser = yield UserJoin_1.default.newUserJoin(spaceId, userId);
                socket.join(spaceId);
                this.io.to(spaceId).emit("join:success", { users: newUser === null || newUser === void 0 ? void 0 : newUser.members });
            }));
            socket.on("user:move", ({ user, spaceId }) => {
                console.log(user);
                this.io.to(spaceId).emit("user:moved", { user });
            });
            socket.on("user-disconnect", (_a) => __awaiter(this, [_a], void 0, function* ({ spaceId, userId }) {
                const notConnectedUser = yield UserJoin_1.default.removeUser(spaceId, userId);
                this.io.to(spaceId).emit("user:left", { users: notConnectedUser === null || notConnectedUser === void 0 ? void 0 : notConnectedUser.members });
            }));
        });
    }
}
exports.default = SocketInstance;
