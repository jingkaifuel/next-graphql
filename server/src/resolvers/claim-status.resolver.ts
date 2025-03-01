import { ClaimStatus } from "../models";
import { IClaimStatus } from "../models/claim-status.model";

export default {
  Query: {
    claimStatuses: async (): Promise<IClaimStatus[]> => {
      return await ClaimStatus.find();
    },
  },

  Mutation: {
    createClaimStatus: async (_, args, ctx): Promise<IClaimStatus> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { data } = args;

      try {
        return await ClaimStatus.create({ ...data, isActive: true });
      } catch (e) {
        throw new Error(e);
      }
    },
    updateClaimStatus: async (_, args, ctx): Promise<IClaimStatus> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { _id, data } = args;

      try {
        return await ClaimStatus.findByIdAndUpdate(
          { _id },
          { ...data },
          { new: true }
        );
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
