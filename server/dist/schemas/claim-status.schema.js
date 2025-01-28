"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
// Define the GraphQL schema
exports.default = (0, graphql_tag_1.gql) `
  type Query {
    getClaimStatuses: [ClaimStatus]
    getClaimStatus(_id: String!): ClaimStatus!
  }

  type Mutation {
    createClaimStatus(data: ClaimStatusInput!): ClaimStatus
    updateClaimStatus(_id: String!, data: ClaimStatusInput!): ClaimStatus
  }

  type ClaimStatus {
    _id: ID!
    name: String!
    description: String
    isActive: Boolean
  }

  input ClaimStatusInput {
    name: String!
    description: String
    isActive: Boolean
  }
`;
