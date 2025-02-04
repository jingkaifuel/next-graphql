import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claimLimits: [ClaimLimit!]!
    claimLimitById(_id: ID): ClaimLimit
    claimLimitsByUser: [ClaimLimit!]!
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
    balance: Float!
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
