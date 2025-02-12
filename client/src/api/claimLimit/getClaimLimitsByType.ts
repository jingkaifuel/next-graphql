import { ClaimLimit } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query ClaimLimitsByType($type: String) {
    claimLimitsByType(type: $type) {
      _id
      year
      claimType {
        _id
        name
        description
        isActive
      }
      user {
        _id
        username
        name
        email
        position
        isActive
      }
      maxAmount
      balance
      approver {
        _id
        username
        name
        email
        position
        isActive
      }
      isActive
    }
  }
`;

export type GetClaimLimitsByTypeResponse = {
  claimLimitsByType: ClaimLimit[];
};
