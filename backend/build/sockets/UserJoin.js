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
const WorkingSpace_1 = __importDefault(require("../model/WorkingSpace"));
class UserJoin {
    newUserJoin(spaceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return;
            const existingUser = yield WorkingSpace_1.default.findOne({
                _id: spaceId,
                members: userId
            }).populate("members", "-password -email -avatar -__v -createdAt -updatedAt");
            if (existingUser)
                return existingUser;
            const newUserJoin = yield WorkingSpace_1.default.findOneAndUpdate({
                _id: spaceId,
            }, { $push: { members: userId } }, { new: true }).populate("members", "-password -email -avatar -__v -createdAt -updatedAt");
            return newUserJoin;
        });
    }
    removeUser(spaceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return;
            const removeFromSpace = yield WorkingSpace_1.default.findOneAndUpdate({
                _id: spaceId
            }, { $pull: { members: userId } }, { new: true }).populate("members", "-password -email -avatar -__v -createdAt -updatedAt");
            return removeFromSpace;
        });
    }
}
exports.default = new UserJoin;
