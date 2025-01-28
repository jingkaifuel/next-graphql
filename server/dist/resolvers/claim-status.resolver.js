"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.default = {
    Query: {
        // Get all claimStatus
        getClaimStatuses: async () => {
            return await models_1.ClaimStatus.find();
        },
        // Get ClaimStatus by ID
        getClaimStatus: async (_, { _id }) => {
            return await models_1.ClaimStatus.findById({ _id });
        },
    },
    Mutation: {
        // Create a claimStatus
        createClaimStatus: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { data } = args;
            try {
                return await models_1.ClaimStatus.create({ ...data, isActive: true });
            }
            catch (e) {
                throw new Error(e);
            }
        },
        // Update an existing claimStatus at given claimStatus ID
        updateClaimStatus: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { _id, data } = args;
            try {
                return await models_1.ClaimStatus.findByIdAndUpdate({ _id }, { ...data }, { new: true });
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
