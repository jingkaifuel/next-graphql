"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const user_schema_1 = __importDefault(require("./user.schema"));
const claim_type_schema_1 = __importDefault(require("./claim-type.schema"));
const claim_limit_schema_1 = __importDefault(require("./claim-limit.schema"));
const claim_status_schema_1 = __importDefault(require("./claim-status.schema"));
const claim_schema_1 = __importDefault(require("./claim.schema"));
// Combine all the individual schemas
const typeDefs = (0, graphql_tag_1.gql) `
  ${user_schema_1.default}
  ${claim_type_schema_1.default}
  ${claim_limit_schema_1.default}
  ${claim_status_schema_1.default}
  ${claim_schema_1.default}
`;
exports.default = typeDefs;
