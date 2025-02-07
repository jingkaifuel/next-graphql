import { gql } from "@apollo/client";

export default gql`
  mutation CreateUser($user: UserCreateInput) {
    createUser(user: $user) {
      _id
      username
      name
      email
      position
    }
  }
`;
