import { ClaimStatus } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query GetClaimStatuses {
    claimStatuses {
      _id
      name
      description
      isActive
    }
  }
`;

export type GetClaimStatusesResponse = {
  claimStatuses: ClaimStatus[];
};
