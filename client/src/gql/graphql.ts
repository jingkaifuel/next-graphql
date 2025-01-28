/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Claim = {
  __typename?: 'Claim';
  _id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  approvedBy?: Maybe<User>;
  claimType: ClaimType;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ClaimStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ClaimCreateInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  claimType?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
};

export type ClaimLimit = {
  __typename?: 'ClaimLimit';
  _id: Scalars['ID']['output'];
  approver?: Maybe<Array<Maybe<User>>>;
  claimType: ClaimType;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxAmount: Scalars['Float']['output'];
  user: User;
  year: Scalars['String']['output'];
};

export type ClaimLimitInput = {
  approver?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  claimType: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxAmount: Scalars['Float']['input'];
  user: Scalars['ID']['input'];
  year: Scalars['String']['input'];
};

export type ClaimStatus = {
  __typename?: 'ClaimStatus';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
};

export type ClaimStatusInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type ClaimType = {
  __typename?: 'ClaimType';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
};

export type ClaimTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type ClaimUpdateInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  approvedBy?: InputMaybe<Scalars['ID']['input']>;
  claimType?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  remark?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['ID']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClaim?: Maybe<Claim>;
  createClaimLimit?: Maybe<ClaimLimit>;
  createClaimStatus?: Maybe<ClaimStatus>;
  createClaimType?: Maybe<ClaimType>;
  createUser?: Maybe<User>;
  login?: Maybe<AuthPayload>;
  refresh?: Maybe<AuthPayload>;
  updateClaim?: Maybe<Claim>;
  updateClaimLimit?: Maybe<ClaimLimit>;
  updateClaimStatus?: Maybe<ClaimStatus>;
  updateClaimType?: Maybe<ClaimType>;
  updateUser?: Maybe<User>;
};


export type MutationCreateClaimArgs = {
  data: ClaimCreateInput;
};


export type MutationCreateClaimLimitArgs = {
  data: ClaimLimitInput;
};


export type MutationCreateClaimStatusArgs = {
  data: ClaimStatusInput;
};


export type MutationCreateClaimTypeArgs = {
  data: ClaimTypeInput;
};


export type MutationCreateUserArgs = {
  user?: InputMaybe<UserInput>;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRefreshArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateClaimArgs = {
  _id: Scalars['String']['input'];
  data: ClaimUpdateInput;
};


export type MutationUpdateClaimLimitArgs = {
  _id: Scalars['String']['input'];
  data: ClaimLimitInput;
};


export type MutationUpdateClaimStatusArgs = {
  _id: Scalars['String']['input'];
  data: ClaimStatusInput;
};


export type MutationUpdateClaimTypeArgs = {
  _id: Scalars['String']['input'];
  data: ClaimTypeInput;
};


export type MutationUpdateUserArgs = {
  _id: Scalars['String']['input'];
  user?: InputMaybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  getClaim: Claim;
  getClaimLimit: ClaimLimit;
  getClaimLimitByUser: Array<ClaimLimit>;
  getClaimStatus: ClaimStatus;
  getClaimStatuses?: Maybe<Array<Maybe<ClaimStatus>>>;
  getClaimType: ClaimType;
  getClaimTypes: Array<ClaimType>;
  getClaims: Array<Claim>;
  getCurrentUser?: Maybe<User>;
};


export type QueryGetClaimArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetClaimLimitArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetClaimStatusArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetClaimTypeArgs = {
  _id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', _id: string, username: string, email?: string | null } } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;