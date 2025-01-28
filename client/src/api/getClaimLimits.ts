import { ClaimLimit } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query {
    getClaimLimitByUser {
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
        email
        position
      }
      maxAmount
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
  getClaimLimitByUser: ClaimLimit[];
};
