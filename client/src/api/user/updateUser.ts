import { gql } from "@apollo/client";

export default gql`
  mutation UpdateUser($id: String!, $user: UserInput) {
    updateUser(_id: $id, user: $user) {
      _id
      username
      name
      email
      position
    }
  }
`;
