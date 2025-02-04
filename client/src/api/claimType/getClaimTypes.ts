import { ClaimType } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query GetClaimTypes {
    claimTypes {
      _id
      name
      description
      isActive
    }
  }
`;

export type GetClaimTypesResponse = {
  claimTypes: ClaimType[];
};
