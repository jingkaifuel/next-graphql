import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  balance: Scalars['Float']['output'];
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
  resetPassword?: Maybe<User>;
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


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  claimById: Claim;
  claimLimitById?: Maybe<ClaimLimit>;
  claimLimits: Array<ClaimLimit>;
  claimLimitsByUser: Array<ClaimLimit>;
  claimStatuses: Array<ClaimStatus>;
  claimTypeById?: Maybe<ClaimType>;
  claimTypes: Array<ClaimType>;
  claims: Array<Claim>;
  claimsByUser: Array<Claim>;
  currentUser?: Maybe<User>;
};


export type QueryClaimByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryClaimLimitByIdArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryClaimTypeByIdArgs = {
  _id: Scalars['ID']['input'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Claim: ResolverTypeWrapper<Claim>;
  ClaimCreateInput: ClaimCreateInput;
  ClaimLimit: ResolverTypeWrapper<ClaimLimit>;
  ClaimLimitInput: ClaimLimitInput;
  ClaimStatus: ResolverTypeWrapper<ClaimStatus>;
  ClaimStatusInput: ClaimStatusInput;
  ClaimType: ResolverTypeWrapper<ClaimType>;
  ClaimTypeInput: ClaimTypeInput;
  ClaimUpdateInput: ClaimUpdateInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Claim: Claim;
  ClaimCreateInput: ClaimCreateInput;
  ClaimLimit: ClaimLimit;
  ClaimLimitInput: ClaimLimitInput;
  ClaimStatus: ClaimStatus;
  ClaimStatusInput: ClaimStatusInput;
  ClaimType: ClaimType;
  ClaimTypeInput: ClaimTypeInput;
  ClaimUpdateInput: ClaimUpdateInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClaimResolvers<ContextType = any, ParentType extends ResolversParentTypes['Claim'] = ResolversParentTypes['Claim']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  approvedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  claimType?: Resolver<ResolversTypes['ClaimType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  remark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ClaimStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClaimLimitResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimLimit'] = ResolversParentTypes['ClaimLimit']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  approver?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  claimType?: Resolver<ResolversTypes['ClaimType'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  maxAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClaimStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimStatus'] = ResolversParentTypes['ClaimStatus']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClaimTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimType'] = ResolversParentTypes['ClaimType']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createClaim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<MutationCreateClaimArgs, 'data'>>;
  createClaimLimit?: Resolver<Maybe<ResolversTypes['ClaimLimit']>, ParentType, ContextType, RequireFields<MutationCreateClaimLimitArgs, 'data'>>;
  createClaimStatus?: Resolver<Maybe<ResolversTypes['ClaimStatus']>, ParentType, ContextType, RequireFields<MutationCreateClaimStatusArgs, 'data'>>;
  createClaimType?: Resolver<Maybe<ResolversTypes['ClaimType']>, ParentType, ContextType, RequireFields<MutationCreateClaimTypeArgs, 'data'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  refresh?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationRefreshArgs, 'token'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email' | 'password'>>;
  updateClaim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<MutationUpdateClaimArgs, '_id' | 'data'>>;
  updateClaimLimit?: Resolver<Maybe<ResolversTypes['ClaimLimit']>, ParentType, ContextType, RequireFields<MutationUpdateClaimLimitArgs, '_id' | 'data'>>;
  updateClaimStatus?: Resolver<Maybe<ResolversTypes['ClaimStatus']>, ParentType, ContextType, RequireFields<MutationUpdateClaimStatusArgs, '_id' | 'data'>>;
  updateClaimType?: Resolver<Maybe<ResolversTypes['ClaimType']>, ParentType, ContextType, RequireFields<MutationUpdateClaimTypeArgs, '_id' | 'data'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, '_id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  claimById?: Resolver<ResolversTypes['Claim'], ParentType, ContextType, RequireFields<QueryClaimByIdArgs, '_id'>>;
  claimLimitById?: Resolver<Maybe<ResolversTypes['ClaimLimit']>, ParentType, ContextType, Partial<QueryClaimLimitByIdArgs>>;
  claimLimits?: Resolver<Array<ResolversTypes['ClaimLimit']>, ParentType, ContextType>;
  claimLimitsByUser?: Resolver<Array<ResolversTypes['ClaimLimit']>, ParentType, ContextType>;
  claimStatuses?: Resolver<Array<ResolversTypes['ClaimStatus']>, ParentType, ContextType>;
  claimTypeById?: Resolver<Maybe<ResolversTypes['ClaimType']>, ParentType, ContextType, RequireFields<QueryClaimTypeByIdArgs, '_id'>>;
  claimTypes?: Resolver<Array<ResolversTypes['ClaimType']>, ParentType, ContextType>;
  claims?: Resolver<Array<ResolversTypes['Claim']>, ParentType, ContextType>;
  claimsByUser?: Resolver<Array<ResolversTypes['Claim']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Claim?: ClaimResolvers<ContextType>;
  ClaimLimit?: ClaimLimitResolvers<ContextType>;
  ClaimStatus?: ClaimStatusResolvers<ContextType>;
  ClaimType?: ClaimTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

