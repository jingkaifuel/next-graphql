"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
// Define the GraphQL schema
exports.default = (0, graphql_tag_1.gql) `
  type Query {
    getCurrentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    refresh(token: String!): AuthPayload
    createUser(user: UserInput): User
    updateUser(_id: String!, user: UserInput): User
  }

  type User {
    _id: ID!
    username: String!
    email: String
    position: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UserInput {
    username: String!
    email: String
    position: String
  }
`;
