"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("./models");
const getLoggedInUser = async (req) => {
    const token = req.headers.authorization || "";
    if (!token)
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await models_1.User.findById(decoded["userId"]);
        return user;
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
};
exports.getLoggedInUser = getLoggedInUser;
