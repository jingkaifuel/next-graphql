import { ClaimType } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query GetClaimTypeById($id: ID!) {
    claimTypeById(_id: $id) {
      _id
      name
      description
      isActive
    }
  }
`;

export type GetClaimTypeByIdResponse = {
  claimTypeById: ClaimType;
};
