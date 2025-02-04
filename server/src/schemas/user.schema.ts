import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    currentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    refresh(token: String!): AuthPayload
    resetPassword(email: String!, password: String!): User
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
