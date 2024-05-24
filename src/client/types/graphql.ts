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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Area = {
  __typename?: 'Area';
  CreatedBy: Scalars['String']['output'];
  CreatedOn: Scalars['DateTime']['output'];
  Details?: Maybe<Scalars['String']['output']>;
  Devices: Array<NetworkDeviceBase>;
  Id: Scalars['ID']['output'];
  Name: Scalars['String']['output'];
  ParentArea?: Maybe<AreaBase>;
  ParentAreaId?: Maybe<Scalars['Int']['output']>;
  SubAreas: Array<AreaBase>;
  UpdatedBy?: Maybe<Scalars['String']['output']>;
  UpdatedOn?: Maybe<Scalars['DateTime']['output']>;
};

export type AreaBase = {
  __typename?: 'AreaBase';
  CreatedBy: Scalars['String']['output'];
  CreatedOn: Scalars['DateTime']['output'];
  Details?: Maybe<Scalars['String']['output']>;
  Id: Scalars['ID']['output'];
  Name: Scalars['String']['output'];
  ParentAreaId?: Maybe<Scalars['Int']['output']>;
  UpdatedBy?: Maybe<Scalars['String']['output']>;
  UpdatedOn?: Maybe<Scalars['DateTime']['output']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  AccessToken: Scalars['String']['output'];
  User: UserWithRoles;
};

export type BasicUserInfo = {
  __typename?: 'BasicUserInfo';
  CreatedOn: Scalars['Date']['output'];
  Email: Scalars['String']['output'];
  FirstName?: Maybe<Scalars['String']['output']>;
  Id: Scalars['ID']['output'];
  LastName?: Maybe<Scalars['String']['output']>;
  Username: Scalars['String']['output'];
};

export type ChannelNode = {
  __typename?: 'ChannelNode';
  CustomDesc?: Maybe<Scalars['String']['output']>;
  History?: Maybe<Array<ChannelStatusHistoryBase>>;
  Id: Scalars['ID']['output'];
  NetworkDevId: Scalars['Int']['output'];
  NetworkDevice: NetworkDeviceBase;
  NodeDesc: Scalars['String']['output'];
  NodeNo: Scalars['Int']['output'];
  NodeType: Scalars['String']['output'];
  Status?: Maybe<Array<ChannelStatusBase>>;
};

export type ChannelNodeBase = {
  __typename?: 'ChannelNodeBase';
  CustomDesc?: Maybe<Scalars['String']['output']>;
  Id: Scalars['ID']['output'];
  NetworkDevId: Scalars['Int']['output'];
  NodeDesc: Scalars['String']['output'];
  NodeNo: Scalars['Int']['output'];
  NodeType: Scalars['String']['output'];
};

export type ChannelStatusBase = {
  __typename?: 'ChannelStatusBase';
  Id: Scalars['ID']['output'];
  StateName: Scalars['String']['output'];
  StateType: Scalars['String']['output'];
  StateValue: Scalars['String']['output'];
};

export type ChannelStatusHistoryBase = {
  __typename?: 'ChannelStatusHistoryBase';
  Id: Scalars['ID']['output'];
  State: Scalars['String']['output'];
  Time: Scalars['DateTime']['output'];
};

export type DeviceIdentityInput = {
  DeviceId?: InputMaybe<Scalars['Int']['input']>;
  DeviceType?: InputMaybe<Scalars['Int']['input']>;
  Ip?: InputMaybe<Scalars['String']['input']>;
  SubnetId?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  GetLoginKey: Scalars['String']['output'];
  SignIn: AuthResult;
  UpdateDeviceFilter: Scalars['Boolean']['output'];
  UpdateFilter: SystemFilter;
};


export type MutationGetLoginKeyArgs = {
  Username: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  Key: Scalars['String']['input'];
  Username: Scalars['String']['input'];
};


export type MutationUpdateDeviceFilterArgs = {
  DeviceIds: Array<Scalars['Int']['input']>;
  States: Array<Scalars['Boolean']['input']>;
};


export type MutationUpdateFilterArgs = {
  filter: SystemFilterInput;
};

export type NetworkBroadcaster = {
  __typename?: 'NetworkBroadcaster';
  AllowDevicesByDefault: Scalars['Boolean']['output'];
  DetectedOn: Scalars['DateTime']['output'];
  Devices: Array<NetworkDeviceBase>;
  DisabledBy?: Maybe<Scalars['String']['output']>;
  DisabledOn?: Maybe<Scalars['DateTime']['output']>;
  Enabled?: Maybe<Scalars['Boolean']['output']>;
  EnabledBy?: Maybe<Scalars['String']['output']>;
  EnabledOn?: Maybe<Scalars['DateTime']['output']>;
  Id: Scalars['ID']['output'];
  LastMsgOn?: Maybe<Scalars['DateTime']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
};

export type NetworkBroadcasterBase = {
  __typename?: 'NetworkBroadcasterBase';
  AllowDevicesByDefault: Scalars['Boolean']['output'];
  DetectedOn: Scalars['DateTime']['output'];
  DisabledBy?: Maybe<Scalars['String']['output']>;
  DisabledOn?: Maybe<Scalars['DateTime']['output']>;
  Enabled?: Maybe<Scalars['Boolean']['output']>;
  EnabledBy?: Maybe<Scalars['String']['output']>;
  EnabledOn?: Maybe<Scalars['DateTime']['output']>;
  Id: Scalars['ID']['output'];
  LastMsgOn?: Maybe<Scalars['DateTime']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
};

export type NetworkDevice = {
  __typename?: 'NetworkDevice';
  Area?: Maybe<AreaBase>;
  AreaId?: Maybe<Scalars['Int']['output']>;
  BroadcasterId: Scalars['String']['output'];
  CustomDesc?: Maybe<Scalars['String']['output']>;
  DeviceId: Scalars['Int']['output'];
  DeviceType: Scalars['Int']['output'];
  DisabledBy?: Maybe<Scalars['String']['output']>;
  DisabledOn?: Maybe<Scalars['DateTime']['output']>;
  Enabled?: Maybe<Scalars['Boolean']['output']>;
  EnabledBy?: Maybe<Scalars['String']['output']>;
  EnabledOn?: Maybe<Scalars['DateTime']['output']>;
  Id: Scalars['ID']['output'];
  NetworkBroadcaster: NetworkBroadcaster;
  SubnetId: Scalars['Int']['output'];
};

export type NetworkDeviceBase = {
  __typename?: 'NetworkDeviceBase';
  AreaId?: Maybe<Scalars['Int']['output']>;
  BroadcasterId: Scalars['String']['output'];
  CustomDesc?: Maybe<Scalars['String']['output']>;
  DeviceId: Scalars['Int']['output'];
  DeviceType: Scalars['Int']['output'];
  DisabledBy?: Maybe<Scalars['String']['output']>;
  DisabledOn?: Maybe<Scalars['DateTime']['output']>;
  Enabled?: Maybe<Scalars['Boolean']['output']>;
  EnabledBy?: Maybe<Scalars['String']['output']>;
  EnabledOn?: Maybe<Scalars['DateTime']['output']>;
  Id: Scalars['ID']['output'];
  SubnetId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  AllDeviceFilters: Array<NetworkDevice>;
  AllDevices: Array<NetworkDevice>;
  AllSourceFilters: Array<SystemFilter>;
  AnnounceAreaOccupancy: Area;
  AnnounceNewBroadcaster: NetworkBroadcasterBase;
  AnnounceNewDevice: NetworkBroadcasterBase;
  AnnounceNewSystemFilter: SystemFilter;
  AnnounceNodeStateChanged: ChannelNode;
  DeviceById: NetworkDevice;
  DeviceByParams: NetworkDevice;
  ValidateAuth: UserWithRoles;
};


export type QueryAnnounceAreaOccupancyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAnnounceNewBroadcasterArgs = {
  ip: Scalars['String']['input'];
};


export type QueryAnnounceNewDeviceArgs = {
  id: Scalars['Int']['input'];
  ip: Scalars['String']['input'];
  subnet: Scalars['Int']['input'];
};


export type QueryAnnounceNewSystemFilterArgs = {
  id: Scalars['String']['input'];
};


export type QueryAnnounceNodeStateChangedArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDeviceByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryDeviceByParamsArgs = {
  identity: DeviceIdentityInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  AreaOccupancyStateChanged: Area;
  BroadcasterDetected: NetworkBroadcasterBase;
  ChannelNodeStateChanged: ChannelNode;
  DeviceDetected: NetworkDevice;
  NewSystemFilterCreated: Area;
};

export type SystemFilter = {
  __typename?: 'SystemFilter';
  DetectedOn: Scalars['DateTime']['output'];
  DeviceId?: Maybe<Scalars['String']['output']>;
  FilterAction: Scalars['String']['output'];
  Id: Scalars['ID']['output'];
  Ip: Scalars['String']['output'];
  OrderNo: Scalars['Int']['output'];
  RuleName: Scalars['String']['output'];
  SubnetId?: Maybe<Scalars['String']['output']>;
  UpdatedBy?: Maybe<Scalars['String']['output']>;
  UpdatedOn?: Maybe<Scalars['DateTime']['output']>;
};

export type SystemFilterInput = {
  DeviceId?: InputMaybe<Scalars['String']['input']>;
  FilterAction: Scalars['String']['input'];
  Id?: InputMaybe<Scalars['ID']['input']>;
  Ip: Scalars['String']['input'];
  OrderNo: Scalars['Int']['input'];
  RuleName: Scalars['String']['input'];
  SubnetId?: InputMaybe<Scalars['String']['input']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  Description?: Maybe<Scalars['String']['output']>;
  Id: Scalars['ID']['output'];
  RoleName: Scalars['String']['output'];
  Users?: Maybe<Array<BasicUserInfo>>;
};

export type UserWithRoles = {
  __typename?: 'UserWithRoles';
  CreatedOn: Scalars['Date']['output'];
  Email: Scalars['String']['output'];
  FirstName?: Maybe<Scalars['String']['output']>;
  Id: Scalars['ID']['output'];
  LastName?: Maybe<Scalars['String']['output']>;
  Roles?: Maybe<Array<UserRole>>;
  Username: Scalars['String']['output'];
};

export type GetLoginKeyMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetLoginKeyMutation = { __typename?: 'Mutation', GetLoginKey: string };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  key: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', SignIn: { __typename?: 'AuthResult', AccessToken: string, User: { __typename?: 'UserWithRoles', Id: string, Username: string, FirstName?: string | null, LastName?: string | null, Email: string, CreatedOn: any, Roles?: Array<{ __typename?: 'UserRole', RoleName: string, Id: string }> | null } } };

export type ValidateAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidateAuthQuery = { __typename?: 'Query', ValidateAuth: { __typename?: 'UserWithRoles', Id: string, Username: string, FirstName?: string | null, LastName?: string | null, Email: string, CreatedOn: any, Roles?: Array<{ __typename?: 'UserRole', Id: string, RoleName: string }> | null } };


export const GetLoginKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetLoginKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetLoginKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<GetLoginKeyMutation, GetLoginKeyMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"Key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AccessToken"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"Roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RoleName"}},{"kind":"Field","name":{"kind":"Name","value":"Id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const ValidateAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ValidateAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"Roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"RoleName"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateAuthQuery, ValidateAuthQueryVariables>;