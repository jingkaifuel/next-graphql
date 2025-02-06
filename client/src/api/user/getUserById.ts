import { User } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  query UserById($id: String!) {
    userById(_id: $id) {
      _id
      username
      name
      email
      position
    }
  }
`;

export type GetUserByIdResponse = {
  userById: User;
};
