"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
// Define the GraphQL schema
exports.default = (0, graphql_tag_1.gql) `
  type Query {
    getClaimLimitByUser: [ClaimLimit!]!
    getClaimLimit(_id: String!): ClaimLimit!
  }

  type Mutation {
    createClaimLimit(data: ClaimLimitInput!): ClaimLimit
    updateClaimLimit(_id: String!, data: ClaimLimitInput!): ClaimLimit
  }

  type ClaimLimit {
    _id: ID!
    year: String!
    claimType: ClaimType!
    user: User!
    maxAmount: Float!
    approver: [User]
    isActive: Boolean
  }

  input ClaimLimitInput {
    year: String!
    claimType: ID!
    user: ID!
    maxAmount: Float!
    approver: [ID]
    isActive: Boolean
  }
`;
