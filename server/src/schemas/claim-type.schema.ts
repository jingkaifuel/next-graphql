import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claimTypes: [ClaimType!]!
    claimTypeById(_id: ID!): ClaimType
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
