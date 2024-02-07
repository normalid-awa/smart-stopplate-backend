import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

/** Shooter divisons */
export enum Division {
  Classic = 'CLASSIC',
  Open = 'OPEN',
  Production = 'PRODUCTION',
  Productionoptics = 'PRODUCTIONOPTICS',
  Standard = 'STANDARD'
}

/** Dq reason */
export type Dq = {
  __typename?: 'Dq';
  category: Scalars['String']['output'];
  category_zh: Scalars['String']['output'];
  content: Scalars['String']['output'];
  content_zh: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /**
   *
   *                 The index that locate in the rulebook
   *
   */
  index: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewRound: Scorelist;
  assignScore: Score;
  createScore: Score;
  createScoreboard: Scoreboard;
  createScorelist: Scorelist;
  createShooter: Shooter;
  createStage: Stage;
  deleteScore: Score;
  deleteScoreboard: Scoreboard;
  deleteScorelist: Scorelist;
  deleteShooter: Shooter;
  deleteStage: Stage;
  lockScoreboard: Scoreboard;
  lockScorelist: Scorelist;
  lockStage: Stage;
  resetScore: Score;
  setScoreDNF: Score;
  setScoreDQ: Score;
  swapScoreId?: Maybe<Scalars['Boolean']['output']>;
  updateScore: Score;
  updateScoreboard: Scoreboard;
  updateShooter: Shooter;
  updateStage: Stage;
};


export type MutationAddNewRoundArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAssignScoreArgs = {
  alphaZone: Scalars['Int']['input'];
  charlieZone: Scalars['Int']['input'];
  deltaZone: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  miss: Scalars['Int']['input'];
  noShoots: Scalars['Int']['input'];
  poppers: Scalars['Int']['input'];
  proError: Scalars['Int']['input'];
  time: Scalars['Float']['input'];
};


export type MutationCreateScoreArgs = {
  round: Scalars['Int']['input'];
  scorelistId: Scalars['Int']['input'];
  shooterId: Scalars['Int']['input'];
};


export type MutationCreateScoreboardArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateScorelistArgs = {
  scoreboardId: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationCreateShooterArgs = {
  division: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateStageArgs = {
  condition: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  noShoots: Scalars['Int']['input'];
  paperTargets: Scalars['Int']['input'];
  popperTargets: Scalars['Int']['input'];
};


export type MutationDeleteScoreArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteScoreboardArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteScorelistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteShooterArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLockScoreboardArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLockScorelistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLockStageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationResetScoreArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetScoreDnfArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetScoreDqArgs = {
  dq_reason: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type MutationSwapScoreIdArgs = {
  id1: Scalars['Int']['input'];
  id2: Scalars['Int']['input'];
};


export type MutationUpdateScoreArgs = {
  alphaZone: Scalars['Int']['input'];
  charlieZone: Scalars['Int']['input'];
  deltaZone: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  miss: Scalars['Int']['input'];
  noShoots: Scalars['Int']['input'];
  poppers: Scalars['Int']['input'];
  proError: Scalars['Int']['input'];
  time: Scalars['Float']['input'];
};


export type MutationUpdateScoreboardArgs = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateShooterArgs = {
  division: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateStageArgs = {
  condition: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  noShoots: Scalars['Int']['input'];
  paperTargets: Scalars['Int']['input'];
  popperTargets: Scalars['Int']['input'];
};

export type ProErrorItem = {
  __typename?: 'ProErrorItem';
  big_title: Scalars['String']['output'];
  big_title_zh: Scalars['String']['output'];
  content: Scalars['String']['output'];
  content_zh: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /**
   * @deprecated
   *                 The index locate in the rulebook
   *
   */
  index: Scalars['String']['output'];
  single_punishment: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllDqReason: Array<Dq>;
  getAllProError: Array<ProErrorItem>;
  getAllScoreboards: Array<Scoreboard>;
  getAllScorelists: Array<Scorelist>;
  getAllScores: Array<Score>;
  getAllShooters: Array<Maybe<Shooter>>;
  getAllStages: Array<Stage>;
  getScore: Score;
  getScoreboard: Scoreboard;
  getScorelist: Scorelist;
  getScores: Array<Score>;
  getShooter?: Maybe<Shooter>;
  getStage: Stage;
};


export type QueryGetScoreArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetScoreboardArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetScorelistArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetScoresArgs = {
  round?: InputMaybe<Scalars['Int']['input']>;
  scoreState?: InputMaybe<ScoreState>;
  scorelistId?: InputMaybe<Scalars['Int']['input']>;
  shooterId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetShooterArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetStageArgs = {
  id: Scalars['Int']['input'];
};

/** The single record in Scorelist */
export type Score = {
  __typename?: 'Score';
  alphaZone: Scalars['Int']['output'];
  charlieZone: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deltaZone: Scalars['Int']['output'];
  hitFactor: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  miss: Scalars['Int']['output'];
  noShoots: Scalars['Int']['output'];
  poppers: Scalars['Int']['output'];
  proError: Scalars['Int']['output'];
  round: Scalars['Int']['output'];
  scoreState: ScoreState;
  scorelist: Scorelist;
  shooter: Shooter;
  time: Scalars['Float']['output'];
  totalScore: Scalars['Int']['output'];
};

/** Score state */
export enum ScoreState {
  Dnf = 'DNF',
  Dq = 'DQ',
  HaveNotScoredYet = 'HAVE_NOT_SCORED_YET',
  Scored = 'SCORED'
}

/** The the collection of Scorelist */
export type Scoreboard = {
  __typename?: 'Scoreboard';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isLocked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  scorelists: Array<Scorelist>;
};

/** The the collection of Score */
export type Scorelist = {
  __typename?: 'Scorelist';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isLocked: Scalars['Boolean']['output'];
  rounds: Scalars['Int']['output'];
  scoreboard: Scoreboard;
  scores: Array<Score>;
  stage: Stage;
};

export type Shooter = {
  __typename?: 'Shooter';
  createdAt: Scalars['DateTime']['output'];
  division: Division;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Stage = {
  __typename?: 'Stage';
  condition: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isLocked: Scalars['Boolean']['output'];
  maximumPoints: Scalars['Int']['output'];
  minimumRounds: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  noShoots: Scalars['Int']['output'];
  paperTargets: Scalars['Int']['output'];
  popperTargets: Scalars['Int']['output'];
  type: StageType;
};

/** Stage type */
export enum StageType {
  Long = 'LONG',
  Medium = 'MEDIUM',
  Other = 'OTHER',
  Short = 'SHORT'
}

export type Subscription = {
  __typename?: 'Subscription';
  subscribeToScoreUpdate: Scalars['Boolean']['output'];
  subscribeToScoreboardUpdate: Scalars['Boolean']['output'];
  subscribeToScorelistUpdate: Scalars['Boolean']['output'];
  subscribeToShooterUpdate: Scalars['Boolean']['output'];
  subscribeToStageUpdate: Scalars['Boolean']['output'];
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Division: Division;
  Dq: ResolverTypeWrapper<Dq>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ProErrorItem: ResolverTypeWrapper<ProErrorItem>;
  Query: ResolverTypeWrapper<{}>;
  Score: ResolverTypeWrapper<Score>;
  ScoreState: ScoreState;
  Scoreboard: ResolverTypeWrapper<Scoreboard>;
  Scorelist: ResolverTypeWrapper<Scorelist>;
  Shooter: ResolverTypeWrapper<Shooter>;
  Stage: ResolverTypeWrapper<Stage>;
  StageType: StageType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Dq: Dq;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  ProErrorItem: ProErrorItem;
  Query: {};
  Score: Score;
  Scoreboard: Scoreboard;
  Scorelist: Scorelist;
  Shooter: Shooter;
  Stage: Stage;
  String: Scalars['String']['output'];
  Subscription: {};
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DqResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dq'] = ResolversParentTypes['Dq']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category_zh?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_zh?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addNewRound?: Resolver<ResolversTypes['Scorelist'], ParentType, ContextType, RequireFields<MutationAddNewRoundArgs, 'id'>>;
  assignScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationAssignScoreArgs, 'alphaZone' | 'charlieZone' | 'deltaZone' | 'id' | 'miss' | 'noShoots' | 'poppers' | 'proError' | 'time'>>;
  createScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationCreateScoreArgs, 'round' | 'scorelistId' | 'shooterId'>>;
  createScoreboard?: Resolver<ResolversTypes['Scoreboard'], ParentType, ContextType, RequireFields<MutationCreateScoreboardArgs, 'name'>>;
  createScorelist?: Resolver<ResolversTypes['Scorelist'], ParentType, ContextType, RequireFields<MutationCreateScorelistArgs, 'scoreboardId' | 'stageId'>>;
  createShooter?: Resolver<ResolversTypes['Shooter'], ParentType, ContextType, RequireFields<MutationCreateShooterArgs, 'division' | 'name'>>;
  createStage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType, RequireFields<MutationCreateStageArgs, 'condition' | 'description' | 'name' | 'noShoots' | 'paperTargets' | 'popperTargets'>>;
  deleteScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationDeleteScoreArgs, 'id'>>;
  deleteScoreboard?: Resolver<ResolversTypes['Scoreboard'], ParentType, ContextType, RequireFields<MutationDeleteScoreboardArgs, 'id'>>;
  deleteScorelist?: Resolver<ResolversTypes['Scorelist'], ParentType, ContextType, RequireFields<MutationDeleteScorelistArgs, 'id'>>;
  deleteShooter?: Resolver<ResolversTypes['Shooter'], ParentType, ContextType, RequireFields<MutationDeleteShooterArgs, 'id'>>;
  deleteStage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType, RequireFields<MutationDeleteStageArgs, 'id'>>;
  lockScoreboard?: Resolver<ResolversTypes['Scoreboard'], ParentType, ContextType, RequireFields<MutationLockScoreboardArgs, 'id'>>;
  lockScorelist?: Resolver<ResolversTypes['Scorelist'], ParentType, ContextType, RequireFields<MutationLockScorelistArgs, 'id'>>;
  lockStage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType, RequireFields<MutationLockStageArgs, 'id'>>;
  resetScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationResetScoreArgs, 'id'>>;
  setScoreDNF?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationSetScoreDnfArgs, 'id'>>;
  setScoreDQ?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationSetScoreDqArgs, 'dq_reason' | 'id'>>;
  swapScoreId?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSwapScoreIdArgs, 'id1' | 'id2'>>;
  updateScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationUpdateScoreArgs, 'alphaZone' | 'charlieZone' | 'deltaZone' | 'id' | 'miss' | 'noShoots' | 'poppers' | 'proError' | 'time'>>;
  updateScoreboard?: Resolver<ResolversTypes['Scoreboard'], ParentType, ContextType, RequireFields<MutationUpdateScoreboardArgs, 'id' | 'name'>>;
  updateShooter?: Resolver<ResolversTypes['Shooter'], ParentType, ContextType, RequireFields<MutationUpdateShooterArgs, 'division' | 'id' | 'name'>>;
  updateStage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType, RequireFields<MutationUpdateStageArgs, 'condition' | 'description' | 'id' | 'name' | 'noShoots' | 'paperTargets' | 'popperTargets'>>;
};

export type ProErrorItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProErrorItem'] = ResolversParentTypes['ProErrorItem']> = {
  big_title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  big_title_zh?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content_zh?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  single_punishment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllDqReason?: Resolver<Array<ResolversTypes['Dq']>, ParentType, ContextType>;
  getAllProError?: Resolver<Array<ResolversTypes['ProErrorItem']>, ParentType, ContextType>;
  getAllScoreboards?: Resolver<Array<ResolversTypes['Scoreboard']>, ParentType, ContextType>;
  getAllScorelists?: Resolver<Array<ResolversTypes['Scorelist']>, ParentType, ContextType>;
  getAllScores?: Resolver<Array<ResolversTypes['Score']>, ParentType, ContextType>;
  getAllShooters?: Resolver<Array<Maybe<ResolversTypes['Shooter']>>, ParentType, ContextType>;
  getAllStages?: Resolver<Array<ResolversTypes['Stage']>, ParentType, ContextType>;
  getScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<QueryGetScoreArgs, 'id'>>;
  getScoreboard?: Resolver<ResolversTypes['Scoreboard'], ParentType, ContextType, RequireFields<QueryGetScoreboardArgs, 'id'>>;
  getScorelist?: Resolver<ResolversTypes['Scorelist'], ParentType, ContextType, RequireFields<QueryGetScorelistArgs, 'id'>>;
  getScores?: Resolver<Array<ResolversTypes['Score']>, ParentType, ContextType, Partial<QueryGetScoresArgs>>;
  getShooter?: Resolver<Maybe<ResolversTypes['Shooter']>, ParentType, ContextType, RequireFields<QueryGetShooterArgs, 'id'>>;
  getStage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType, RequireFields<QueryGetStageArgs, 'id'>>;
};

export type ScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Score'] = ResolversParentTypes['Score']> = {
  alphaZone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  charlieZone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deltaZone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hitFactor?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  miss?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  noShoots?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  poppers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  proError?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scoreState?: Resolver<ResolversTypes['ScoreState'], ParentType, ContextType>;
  scorelist?: Resolver<ResolversTypes['Scorelist'], ParentType, ContextType>;
  shooter?: Resolver<ResolversTypes['Shooter'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScoreboardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Scoreboard'] = ResolversParentTypes['Scoreboard']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scorelists?: Resolver<Array<ResolversTypes['Scorelist']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScorelistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Scorelist'] = ResolversParentTypes['Scorelist']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scoreboard?: Resolver<ResolversTypes['Scoreboard'], ParentType, ContextType>;
  scores?: Resolver<Array<ResolversTypes['Score']>, ParentType, ContextType>;
  stage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShooterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shooter'] = ResolversParentTypes['Shooter']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  division?: Resolver<ResolversTypes['Division'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stage'] = ResolversParentTypes['Stage']> = {
  condition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maximumPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minimumRounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noShoots?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  paperTargets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  popperTargets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StageType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  subscribeToScoreUpdate?: SubscriptionResolver<ResolversTypes['Boolean'], "subscribeToScoreUpdate", ParentType, ContextType>;
  subscribeToScoreboardUpdate?: SubscriptionResolver<ResolversTypes['Boolean'], "subscribeToScoreboardUpdate", ParentType, ContextType>;
  subscribeToScorelistUpdate?: SubscriptionResolver<ResolversTypes['Boolean'], "subscribeToScorelistUpdate", ParentType, ContextType>;
  subscribeToShooterUpdate?: SubscriptionResolver<ResolversTypes['Boolean'], "subscribeToShooterUpdate", ParentType, ContextType>;
  subscribeToStageUpdate?: SubscriptionResolver<ResolversTypes['Boolean'], "subscribeToStageUpdate", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Dq?: DqResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProErrorItem?: ProErrorItemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Score?: ScoreResolvers<ContextType>;
  Scoreboard?: ScoreboardResolvers<ContextType>;
  Scorelist?: ScorelistResolvers<ContextType>;
  Shooter?: ShooterResolvers<ContextType>;
  Stage?: StageResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

