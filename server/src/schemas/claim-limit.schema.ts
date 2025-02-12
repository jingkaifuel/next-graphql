import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claimLimits: [ClaimLimit!]!
    claimLimitById(_id: ID): ClaimLimit
    claimLimitsByUser: [ClaimLimit!]!
    claimLimitsByType(type: String): [ClaimLimit!]!
  }

  type Mutation {
    createClaimLimit(data: ClaimLimitCreateInput!): ClaimLimit
    updateClaimLimit(_id: String!, data: ClaimLimitUpdateInput!): ClaimLimit
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

  input ClaimLimitCreateInput {
    year: String!
    claimType: ID!
    user: ID!
    maxAmount: Float!
    approver: [ID]
    isActive: Boolean
  }

  input ClaimLimitUpdateInput {
    year: String
    claimType: ID
    user: ID
    maxAmount: Float
    approver: [ID]
    isActive: Boolean
  }
`;
