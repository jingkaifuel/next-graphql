import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claims: [Claim!]!
    claimById(_id: String!): Claim!
    claimsByUser: [Claim!]!
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
