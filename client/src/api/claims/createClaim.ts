import { Claim, ClaimCreateInput } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  mutation CreateClaim($data: ClaimCreateInput!) {
    createClaim(data: $data) {
      _id
      claimType {
        _id
        name
        description
        isActive
      }
      description
      createdBy {
        _id
        username
        email
        position
      }
      createdAt
      updatedAt
      amount
      remark
      approvedBy {
        _id
        username
        email
        position
      }
      status {
        _id
        name
        description
        isActive
      }
    }
  }
`;

export type CreateClaimResponse = {
  createClaim: Claim;
};
export type CreateClaimPayload = {
  data: ClaimCreateInput;
};
