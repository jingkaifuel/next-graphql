import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    currentUser: User
    users: [User!]!
    userById(_id: String!): User!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    resetPassword(email: String!, password: String!): User
    createUser(user: UserCreateInput): User
    updateUser(_id: String!, user: UserInput): User
  }

  type User {
    _id: ID!
    username: String!
    name: String
    email: String
    position: String
  }

  type AuthPayload {
    token: String!
  }

  input UserInput {
    username: String!
    name: String
    email: String
    position: String
  }

  input UserCreateInput {
    username: String!
    name: String!
    password: String!
    email: String!
    position: String!
  }
`;
