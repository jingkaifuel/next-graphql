"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
// Define the GraphQL schema
exports.default = (0, graphql_tag_1.gql) `
  type Query {
    getClaimTypes: [ClaimType!]!
    getClaimType(_id: String!): ClaimType!
  }

  type Mutation {
    createClaimType(data: ClaimTypeInput!): ClaimType
    updateClaimType(_id: String!, data: ClaimTypeInput!): ClaimType
  }

  type ClaimType {
    _id: ID!
    name: String!
    description: String
    isActive: Boolean
  }

  input ClaimTypeInput {
    name: String!
    description: String
    isActive: Boolean
  }
`;
