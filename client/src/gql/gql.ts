/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetClaimLimitByUser {\n    claimLimitsByUser {\n      _id\n      year\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      user {\n        _id\n        username\n        email\n        position\n      }\n      maxAmount\n      balance\n      approver {\n        _id\n        username\n        email\n        position\n      }\n      isActive\n    }\n  }\n": types.GetClaimLimitByUserDocument,
    "\n  query GetClaimTypes {\n    claimTypes {\n      _id\n      name\n      description\n      isActive\n    }\n  }\n": types.GetClaimTypesDocument,
    "\n  mutation CreateClaim($data: ClaimCreateInput!) {\n    createClaim(data: $data) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n": types.CreateClaimDocument,
    "\n  query ClaimById($id: String!) {\n    claimById(_id: $id) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n": types.ClaimByIdDocument,
    "\n  query GetClaims {\n    claims {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n": types.GetClaimsDocument,
    "\n  mutation UpdateClaim($id: String!, $data: ClaimUpdateInput!) {\n    updateClaim(_id: $id, data: $data) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n": types.UpdateClaimDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      token\n      user {\n        _id\n        username\n        email\n        position\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation ResetPassword($email: String!, $password: String!) {\n    resetPassword(email: $email, password: $password) {\n      _id\n      username\n      email\n      position\n    }\n  }\n": types.ResetPasswordDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClaimLimitByUser {\n    claimLimitsByUser {\n      _id\n      year\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      user {\n        _id\n        username\n        email\n        position\n      }\n      maxAmount\n      balance\n      approver {\n        _id\n        username\n        email\n        position\n      }\n      isActive\n    }\n  }\n"): (typeof documents)["\n  query GetClaimLimitByUser {\n    claimLimitsByUser {\n      _id\n      year\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      user {\n        _id\n        username\n        email\n        position\n      }\n      maxAmount\n      balance\n      approver {\n        _id\n        username\n        email\n        position\n      }\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClaimTypes {\n    claimTypes {\n      _id\n      name\n      description\n      isActive\n    }\n  }\n"): (typeof documents)["\n  query GetClaimTypes {\n    claimTypes {\n      _id\n      name\n      description\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateClaim($data: ClaimCreateInput!) {\n    createClaim(data: $data) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateClaim($data: ClaimCreateInput!) {\n    createClaim(data: $data) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClaimById($id: String!) {\n    claimById(_id: $id) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  query ClaimById($id: String!) {\n    claimById(_id: $id) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetClaims {\n    claims {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetClaims {\n    claims {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateClaim($id: String!, $data: ClaimUpdateInput!) {\n    updateClaim(_id: $id, data: $data) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateClaim($id: String!, $data: ClaimUpdateInput!) {\n    updateClaim(_id: $id, data: $data) {\n      _id\n      claimType {\n        _id\n        name\n        description\n        isActive\n      }\n      description\n      createdBy {\n        _id\n        username\n        email\n        position\n      }\n      createdAt\n      updatedAt\n      amount\n      remark\n      approvedBy {\n        _id\n        username\n        email\n        position\n      }\n      status {\n        _id\n        name\n        description\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      token\n      user {\n        _id\n        username\n        email\n        position\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      token\n      user {\n        _id\n        username\n        email\n        position\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($email: String!, $password: String!) {\n    resetPassword(email: $email, password: $password) {\n      _id\n      username\n      email\n      position\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($email: String!, $password: String!) {\n    resetPassword(email: $email, password: $password) {\n      _id\n      username\n      email\n      position\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;