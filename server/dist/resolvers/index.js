"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_resolver_1 = __importDefault(require("./user.resolver"));
const claim_type_resolver_1 = __importDefault(require("./claim-type.resolver"));
const claim_limit_resolver_1 = __importDefault(require("./claim-limit.resolver"));
const claim_status_resolver_1 = __importDefault(require("./claim-status.resolver"));
const claim_resolver_1 = __importDefault(require("./claim.resolver"));
const resolvers = (0, merge_1.mergeResolvers)([
    user_resolver_1.default,
    claim_type_resolver_1.default,
    claim_limit_resolver_1.default,
    claim_status_resolver_1.default,
    claim_resolver_1.default,
]);
exports.default = resolvers;
