import { User } from "@/gql/graphql";
import { gql } from "@apollo/client";

export default gql`
  mutation ResetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      _id
      username
      email
      position
    }
  }
`;

export type ResetPasswordResponse = {
  resetPassword: User;
};
