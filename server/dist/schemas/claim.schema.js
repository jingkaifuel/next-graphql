"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
// Define the GraphQL schema
exports.default = (0, graphql_tag_1.gql) `
  type Query {
    getClaims: [Claim!]!
    getClaim(_id: String!): Claim!
  }

  type Mutation {
    createClaim(data: ClaimCreateInput!): Claim
    updateClaim(_id: String!, data: ClaimUpdateInput!): Claim
  }

  type Claim {
    _id: ID!
    claimType: ClaimType!
    description: String!
    createdBy: User!
    createdAt: String!
    updatedAt: String
    amount: Float!
    remark: String
    approvedBy: User
    status: ClaimStatus
  }

  input ClaimUpdateInput {
    claimType: ID
    description: String
    createdBy: ID
    createdAt: String
    updatedAt: String
    amount: Float
    remark: String
    approvedBy: ID
    status: ID
  }

  input ClaimCreateInput {
    claimType: ID
    description: String
    amount: Float
    remark: String
  }
`;
