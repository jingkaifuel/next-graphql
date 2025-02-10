import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claimStatuses: [ClaimStatus!]!
  }

  type Mutation {
    createClaimStatus(data: ClaimStatusCreateInput!): ClaimStatus
    updateClaimStatus(_id: String!, data: ClaimStatusUpdateInput!): ClaimStatus
  }

  type ClaimStatus {
    _id: ID!
    name: String!
    description: String
    isActive: Boolean
  }

  input ClaimStatusCreateInput {
    name: String!
    description: String
    isActive: Boolean
  }

  input ClaimStatusUpdateInput {
    name: String
    description: String
    isActive: Boolean
  }
`;
