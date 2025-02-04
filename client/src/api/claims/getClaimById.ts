import { Claim } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query ClaimById($id: String!) {
    claimById(_id: $id) {
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

export type GetClaimByIdResponse = {
  claimById: Claim;
};
