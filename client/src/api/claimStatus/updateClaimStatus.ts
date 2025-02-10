import { gql } from "@apollo/client";

export default gql`
  mutation UpdateClaimStatus($id: String!, $data: ClaimStatusUpdateInput!) {
    updateClaimStatus(_id: $id, data: $data) {
      _id
      name
      description
      isActive
    }
  }
`;
