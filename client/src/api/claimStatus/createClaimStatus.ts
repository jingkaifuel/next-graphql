import { gql } from "@apollo/client";

export default gql`
  mutation CreateClaimStatus($data: ClaimStatusCreateInput!) {
    createClaimStatus(data: $data) {
      _id
      name
      description
      isActive
    }
  }
`;
