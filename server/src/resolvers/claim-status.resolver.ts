import { ClaimStatus } from "../models";
import { IClaimStatus } from "../models/claim-status.model";

export default {
  Query: {
    // Get all claimStatus
    getClaimStatuses: async (): Promise<IClaimStatus[]> => {
      return await ClaimStatus.find();
    },
    // Get ClaimStatus by ID
    getClaimStatus: async (_, { _id }): Promise<IClaimStatus> => {
      return await ClaimStatus.findById({ _id });
    },
  },

  Mutation: {
    // Create a claimStatus
    createClaimStatus: async (_, args, ctx): Promise<IClaimStatus> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { data } = args;

      try {
        return await ClaimStatus.create({ ...data, isActive: true });
      } catch (e) {
        throw new Error(e);
      }
    },

    // Update an existing claimStatus at given claimStatus ID
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
