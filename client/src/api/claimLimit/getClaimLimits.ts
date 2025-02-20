import { ClaimLimit } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query GetClaimLimitByUser {
    claimLimitsByUser {
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
        name
        username
        email
        position
      }
      maxAmount
      balance
      approver {
        _id
        username
        email
        position
      }
      isActive
    }
  }
`;

export type GetClaimLimitResponse = {
  claimLimitsByUser: ClaimLimit[];
};
