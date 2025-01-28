"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schemas_1 = __importDefault(require("./schemas"));
const resolvers_1 = __importDefault(require("./resolvers"));
const db_1 = __importDefault(require("./db"));
const auth_1 = require("./auth");
// Load dotenv
require("dotenv").config();
async function startApolloServer() {
    // Connect to the MongoDB database
    await (0, db_1.default)();
    // Create an Apollo Server instance with the schema and resolvers
    const server = new server_1.ApolloServer({
        typeDefs: schemas_1.default,
        resolvers: resolvers_1.default,
    });
    // Start the Apollo server
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async ({ req, res }) => {
            // Get the current user from the request header
            const user = await (0, auth_1.getLoggedInUser)(req);
            return { req, res, user };
        },
    });
    console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}
startApolloServer();
