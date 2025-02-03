import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claimStatuses: [ClaimStatus!]!
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
