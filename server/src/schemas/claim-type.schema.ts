import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    claimTypes: [ClaimType!]!
    claimTypeById(_id: ID!): ClaimType
  }

  type Mutation {
    createClaimType(data: ClaimTypeCreateInput!): ClaimType
    updateClaimType(_id: String!, data: ClaimTypeUpdateInput!): ClaimType
  }

  type ClaimType {
    _id: ID!
    name: String!
    description: String
    isActive: Boolean
  }

  input ClaimTypeCreateInput {
    name: String!
    description: String
    isActive: Boolean
  }

  input ClaimTypeUpdateInput {
    name: String
    description: String
    isActive: Boolean
  }
`;
