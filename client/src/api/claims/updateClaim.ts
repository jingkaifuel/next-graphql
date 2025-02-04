import { Claim, ClaimUpdateInput } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  mutation UpdateClaim($id: String!, $data: ClaimUpdateInput!) {
    updateClaim(_id: $id, data: $data) {
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

export type UpdateClaimResponse = {
  updateClaim: Claim;
};
export type UpdateClaimPayload = {
  id: string;
  data: ClaimUpdateInput;
};
