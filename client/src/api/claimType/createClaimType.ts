import { gql } from "@apollo/client";

export default gql`
  mutation CreateClaimType($data: ClaimTypeCreateInput!) {
    createClaimType(data: $data) {
      _id
      name
      description
      isActive
    }
  }
`;
