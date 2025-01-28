"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const populatedFields = ["claimType", "createdBy", "approvedBy", "status"];
exports.default = {
    Query: {
        // Get all claims
        getClaims: async () => {
            return await models_1.Claim.find().populate(populatedFields);
        },
        // Get Claim by ID
        getClaim: async (_, { _id }) => {
            return await models_1.Claim.findById({ _id }).populate(populatedFields);
        },
    },
    Mutation: {
        // Create a claim
        createClaim: async (_, args, ctx) => {
            const { user } = ctx;
            if (!user)
                throw new Error("Unauthorised");
            const { data } = args;
            const now = new Date();
            try {
                return (await models_1.Claim.create({
                    ...data,
                    createdBy: user._id,
                    createdAt: now,
                })).populate(populatedFields);
            }
            catch (e) {
                throw new Error(e);
            }
        },
        // Update an existing claim at given claim ID
        updateClaim: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { _id, data } = args;
            try {
                return await models_1.Claim.findByIdAndUpdate({ _id }, { ...data }, { new: true }).populate(populatedFields);
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
