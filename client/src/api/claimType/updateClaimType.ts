import { gql } from "@apollo/client";

export default gql`
  mutation UpdateClaimType($id: String!, $data: ClaimTypeUpdateInput!) {
    updateClaimType(_id: $id, data: $data) {
      _id
      name
      description
      isActive
    }
  }
`;
