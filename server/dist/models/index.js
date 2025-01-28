"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Claim = exports.ClaimStatus = exports.ClaimLimit = exports.ClaimType = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const claim_type_model_1 = __importDefault(require("./claim-type.model"));
exports.ClaimType = claim_type_model_1.default;
const claim_limit_model_1 = __importDefault(require("./claim-limit.model"));
exports.ClaimLimit = claim_limit_model_1.default;
const claim_status_model_1 = __importDefault(require("./claim-status.model"));
exports.ClaimStatus = claim_status_model_1.default;
const claim_model_1 = __importDefault(require("./claim.model"));
exports.Claim = claim_model_1.default;
