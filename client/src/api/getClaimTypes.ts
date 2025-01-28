import { ClaimType } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query {
    getClaimTypes {
      _id
      name
      description
      isActive
    }
  }
`;

export type GetClaimTypesResponse = {
  getClaimTypes: ClaimType[];
};
