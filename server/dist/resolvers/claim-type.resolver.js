"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.default = {
    Query: {
        // Get all claimTypes
        getClaimTypes: async () => {
            return await models_1.ClaimType.find();
        },
        // Get ClaimType by ID
        getClaimType: async (_, { _id }) => {
            return await models_1.ClaimType.findById({ _id });
        },
    },
    Mutation: {
        // Create a claimType
        createClaimType: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { data } = args;
            try {
                return await models_1.ClaimType.create({ ...data, isActive: true });
            }
            catch (e) {
                throw new Error(e);
            }
        },
        // Update an existing claimType at given claimType ID
        updateClaimType: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { _id, data } = args;
            try {
                return await models_1.ClaimType.findByIdAndUpdate({ _id }, { ...data }, { new: true });
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
