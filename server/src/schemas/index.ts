import { gql } from "graphql-tag";
import userSchema from "./user.schema";
import claimTypeSchema from "./claim-type.schema";
import claimLimitSchema from "./claim-limit.schema";
import claimStatusSchema from "./claim-status.schema";
import claimSchema from "./claim.schema";

// Combine all the individual schemas
const typeDefs = gql`
  ${userSchema}
  ${claimTypeSchema}
  ${claimLimitSchema}
  ${claimStatusSchema}
  ${claimSchema}
`;

export default typeDefs;
