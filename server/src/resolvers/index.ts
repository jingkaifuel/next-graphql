import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver";
import claimTypeResolver from "./claim-type.resolver";
import claimLimitResolver from "./claim-limit.resolver";
import claimStatusResolver from "./claim-status.resolver";
import claimResolver from "./claim.resolver";

const resolvers = mergeResolvers([
  userResolver,
  claimTypeResolver,
  claimLimitResolver,
  claimStatusResolver,
  claimResolver,
]);

export default resolvers;
