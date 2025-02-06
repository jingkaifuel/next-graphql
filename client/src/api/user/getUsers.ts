import { User } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query GetUsers {
    users {
      _id
      username
      name
      email
      position
    }
  }
`;

export type GetUsersResponse = {
  users: User[];
};
