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
  DeviceCount?: Maybe<Scalars['Int']['output']>;
  Devices?: Maybe<Array<NetworkDeviceBase>>;
  Id: Scalars['ID']['output'];
  Name: Scalars['String']['output'];
  ParentArea?: Maybe<AreaBase>;
  ParentAreaId?: Maybe<Scalars['ID']['output']>;
  SubAreas?: Maybe<Array<AreaBase>>;
  Type: Scalars['String']['output'];
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
  ParentAreaId?: Maybe<Scalars['ID']['output']>;
  Type: Scalars['String']['output'];
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

export type ChannelNodeCount = {
  __typename?: 'ChannelNodeCount';
  Channels: Scalars['Int']['output'];
};

export type ChannelNodeWithHistory = {
  __typename?: 'ChannelNodeWithHistory';
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

export type ChannelNodeWithStatus = {
  __typename?: 'ChannelNodeWithStatus';
  CustomDesc?: Maybe<Scalars['String']['output']>;
  Id: Scalars['ID']['output'];
  NetworkDevId: Scalars['Int']['output'];
  NodeDesc: Scalars['String']['output'];
  NodeNo: Scalars['Int']['output'];
  NodeType: Scalars['String']['output'];
  Status?: Maybe<Array<ChannelStatusBase>>;
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

export type LevelAreaInput = {
  Details?: InputMaybe<Scalars['String']['input']>;
  Id?: InputMaybe<Scalars['ID']['input']>;
  Name: Scalars['String']['input'];
  ParentAreaId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddDeviceToRoom: NetworkDevice;
  DelDevice: Scalars['Boolean']['output'];
  DeleteArea: Scalars['Int']['output'];
  DeleteFilter: Scalars['Int']['output'];
  GetLoginKey: Scalars['String']['output'];
  SaveProperty: Area;
  SavePropertyLevel: Area;
  SavePropertyUnit: Area;
  SetDeviceDesc: NetworkDevice;
  SetDeviceNodeDesc: ChannelNode;
  SignIn: AuthResult;
  UpdateDeviceFilter: Scalars['Boolean']['output'];
  UpdateFilter: SystemFilter;
};


export type MutationAddDeviceToRoomArgs = {
  DeviceId: Scalars['Int']['input'];
  RoomId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelDeviceArgs = {
  DeviceId: Scalars['Int']['input'];
};


export type MutationDeleteAreaArgs = {
  AreaIdList: Array<Scalars['Int']['input']>;
};


export type MutationDeleteFilterArgs = {
  filterIds: Array<Scalars['String']['input']>;
};


export type MutationGetLoginKeyArgs = {
  Username: Scalars['String']['input'];
};


export type MutationSavePropertyArgs = {
  Property: PropertyAreaInput;
};


export type MutationSavePropertyLevelArgs = {
  Level: LevelAreaInput;
};


export type MutationSavePropertyUnitArgs = {
  Unit: UnitAreaInput;
};


export type MutationSetDeviceDescArgs = {
  Description: Scalars['String']['input'];
  DeviceId: Scalars['Int']['input'];
};


export type MutationSetDeviceNodeDescArgs = {
  Description: Scalars['String']['input'];
  NodeId: Scalars['Int']['input'];
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
  DisabledBy?: Maybe<Scalars['String']['output']>;
  DisabledOn?: Maybe<Scalars['DateTime']['output']>;
  Enabled?: Maybe<Scalars['Boolean']['output']>;
  EnabledBy?: Maybe<Scalars['String']['output']>;
  EnabledOn?: Maybe<Scalars['DateTime']['output']>;
  Id: Scalars['ID']['output'];
  LastMsgOn?: Maybe<Scalars['DateTime']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  NetworkDevices: Array<NetworkDeviceBase>;
  _count?: Maybe<NetworkDeviceCount>;
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
  Channels: Array<ChannelNodeWithStatus>;
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
  _count?: Maybe<ChannelNodeCount>;
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

export type NetworkDeviceCount = {
  __typename?: 'NetworkDeviceCount';
  NetworkDevices: Scalars['Int']['output'];
};

export type PropertyAreaInput = {
  Details?: InputMaybe<Scalars['String']['input']>;
  Id?: InputMaybe<Scalars['ID']['input']>;
  Name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  ActiveDevices: Array<NetworkDevice>;
  AllDeviceFilters: Array<NetworkDevice>;
  AllDevices: Array<NetworkDevice>;
  AllSourceFilters: Array<SystemFilter>;
  AllUsers: Array<UserWithRoles>;
  AnnounceAreaOccupancy: Area;
  AnnounceNewBroadcaster: NetworkBroadcasterBase;
  AnnounceNewDevice: NetworkBroadcasterBase;
  AnnounceNewSystemFilter: SystemFilter;
  AnnounceNodeStateChanged: ChannelNode;
  AreaByKeyword: Array<Area>;
  ById: Area;
  CurrentSourceFilters: Array<SystemFilter>;
  DeviceById: NetworkDevice;
  DeviceByParams: NetworkDevice;
  DeviceChannelHistory: ChannelNodeWithHistory;
  DisabledDevices: Array<NetworkDevice>;
  LevelUnits: Array<Area>;
  NetworkBroadcasters: Array<NetworkBroadcaster>;
  NetworkDevice: NetworkDevice;
  NetworkDevices: Array<NetworkDevice>;
  PendingSourceFilters: Array<SystemFilter>;
  Properties: Array<Area>;
  PropertyLevels: Array<Area>;
  ValidateAuth?: Maybe<UserWithRoles>;
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


export type QueryAreaByKeywordArgs = {
  filter: Scalars['String']['input'];
};


export type QueryByIdArgs = {
  AreaId: Scalars['Int']['input'];
};


export type QueryDeviceByIdArgs = {
  Id: Scalars['Float']['input'];
};


export type QueryDeviceByParamsArgs = {
  Identity: DeviceIdentityInput;
};


export type QueryDeviceChannelHistoryArgs = {
  ChannelId: Scalars['Int']['input'];
  Cursor?: InputMaybe<Scalars['String']['input']>;
  EndDate?: InputMaybe<Scalars['DateTime']['input']>;
  LastId?: InputMaybe<Scalars['String']['input']>;
  Order?: InputMaybe<Scalars['String']['input']>;
  PageSize?: InputMaybe<Scalars['Int']['input']>;
  StartDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryLevelUnitsArgs = {
  LevelId: Scalars['Int']['input'];
};


export type QueryNetworkBroadcastersArgs = {
  Query?: InputMaybe<QueryArguments>;
};


export type QueryNetworkDeviceArgs = {
  DeviceId: Scalars['Int']['input'];
};


export type QueryNetworkDevicesArgs = {
  Query?: InputMaybe<QueryArguments>;
  RSIP?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPropertyLevelsArgs = {
  PropertyId: Scalars['Int']['input'];
};

export type QueryArguments = {
  Cursor?: InputMaybe<Scalars['String']['input']>;
  Filter?: InputMaybe<Scalars['String']['input']>;
  Order?: InputMaybe<Scalars['String']['input']>;
  PageSize?: InputMaybe<Scalars['Int']['input']>;
  Where?: InputMaybe<Scalars['String']['input']>;
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
  RuleName?: Maybe<Scalars['String']['output']>;
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

export type UnitAreaInput = {
  Details?: InputMaybe<Scalars['String']['input']>;
  Id?: InputMaybe<Scalars['ID']['input']>;
  Name: Scalars['String']['input'];
  ParentAreaId: Scalars['Int']['input'];
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


export type ValidateAuthQuery = { __typename?: 'Query', ValidateAuth?: { __typename?: 'UserWithRoles', Id: string, Username: string, FirstName?: string | null, LastName?: string | null, Email: string, CreatedOn: any, Roles?: Array<{ __typename?: 'UserRole', Id: string, RoleName: string }> | null } | null };

export type NetworkDevicesQueryVariables = Exact<{
  query?: InputMaybe<QueryArguments>;
  rsip?: InputMaybe<Scalars['String']['input']>;
}>;


export type NetworkDevicesQuery = { __typename?: 'Query', NetworkDevices: Array<{ __typename?: 'NetworkDevice', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, EnabledOn?: any | null, Enabled?: boolean | null, DisabledBy?: string | null, EnabledBy?: string | null, DisabledOn?: any | null, Area?: { __typename?: 'AreaBase', Id: string, Name: string, ParentAreaId?: string | null, Type: string, Details?: string | null } | null, NetworkBroadcaster: { __typename?: 'NetworkBroadcaster', Id: string, Name?: string | null, _count?: { __typename?: 'NetworkDeviceCount', NetworkDevices: number } | null }, Channels: Array<{ __typename?: 'ChannelNodeWithStatus', Id: string, CustomDesc?: string | null, NodeDesc: string, NodeNo: number, NodeType: string, Status?: Array<{ __typename?: 'ChannelStatusBase', Id: string, StateName: string, StateType: string, StateValue: string }> | null }>, _count?: { __typename?: 'ChannelNodeCount', Channels: number } | null }> };

export type SetDeviceDescMutationVariables = Exact<{
  deviceId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
}>;


export type SetDeviceDescMutation = { __typename?: 'Mutation', SetDeviceDesc: { __typename?: 'NetworkDevice', Id: string, Enabled?: boolean | null, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, _count?: { __typename?: 'ChannelNodeCount', Channels: number } | null } };

export type SetDeviceNodeDescMutationVariables = Exact<{
  nodeId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
}>;


export type SetDeviceNodeDescMutation = { __typename?: 'Mutation', SetDeviceNodeDesc: { __typename?: 'ChannelNode', CustomDesc?: string | null, Id: string, NodeDesc: string, NodeNo: number, NodeType: string, Status?: Array<{ __typename?: 'ChannelStatusBase', Id: string, StateName: string, StateType: string, StateValue: string }> | null } };

export type AddDeviceToRoomMutationVariables = Exact<{
  deviceId: Scalars['Int']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddDeviceToRoomMutation = { __typename?: 'Mutation', AddDeviceToRoom: { __typename?: 'NetworkDevice', Id: string, DeviceId: number, SubnetId: number, DeviceType: number, Enabled?: boolean | null, CustomDesc?: string | null, AreaId?: number | null, _count?: { __typename?: 'ChannelNodeCount', Channels: number } | null } };

export type DelDeviceMutationVariables = Exact<{
  deviceId: Scalars['Int']['input'];
}>;


export type DelDeviceMutation = { __typename?: 'Mutation', DelDevice: boolean };

export type PropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type PropertiesQuery = { __typename?: 'Query', Properties: Array<{ __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, DeviceCount?: number | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null }> };

export type PropertyLevelsQueryVariables = Exact<{
  propertyId: Scalars['Int']['input'];
}>;


export type PropertyLevelsQuery = { __typename?: 'Query', PropertyLevels: Array<{ __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, DeviceCount?: number | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null }> };

export type LevelUnitsQueryVariables = Exact<{
  levelId: Scalars['Int']['input'];
}>;


export type LevelUnitsQuery = { __typename?: 'Query', LevelUnits: Array<{ __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, DeviceCount?: number | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null }> };

export type AreaByKeywordQueryVariables = Exact<{
  filter: Scalars['String']['input'];
}>;


export type AreaByKeywordQuery = { __typename?: 'Query', AreaByKeyword: Array<{ __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, DeviceCount?: number | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null }> };

export type SavePropertyMutationVariables = Exact<{
  property: PropertyAreaInput;
}>;


export type SavePropertyMutation = { __typename?: 'Mutation', SaveProperty: { __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null } };

export type SavePropertyLevelMutationVariables = Exact<{
  level: LevelAreaInput;
}>;


export type SavePropertyLevelMutation = { __typename?: 'Mutation', SavePropertyLevel: { __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null } };

export type SavePropertyUnitMutationVariables = Exact<{
  unit: UnitAreaInput;
}>;


export type SavePropertyUnitMutation = { __typename?: 'Mutation', SavePropertyUnit: { __typename?: 'Area', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null, ParentArea?: { __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null } | null, SubAreas?: Array<{ __typename?: 'AreaBase', Id: string, Name: string, Type: string, Details?: string | null, ParentAreaId?: string | null, CreatedOn: any, CreatedBy: string, UpdatedOn?: any | null, UpdatedBy?: string | null }> | null, Devices?: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, BroadcasterId: string, AreaId?: number | null, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null }> | null } };

export type DeleteAreaMutationVariables = Exact<{
  areaIdList: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteAreaMutation = { __typename?: 'Mutation', DeleteArea: number };

export type NetworkBroadcastersQueryVariables = Exact<{
  query?: InputMaybe<QueryArguments>;
}>;


export type NetworkBroadcastersQuery = { __typename?: 'Query', NetworkBroadcasters: Array<{ __typename?: 'NetworkBroadcaster', Id: string, Name?: string | null, AllowDevicesByDefault: boolean, Enabled?: boolean | null, EnabledOn?: any | null, EnabledBy?: string | null, DisabledOn?: any | null, DisabledBy?: string | null, DetectedOn: any, LastMsgOn?: any | null, NetworkDevices: Array<{ __typename?: 'NetworkDeviceBase', Id: string, CustomDesc?: string | null, DeviceId: number, SubnetId: number, DeviceType: number, AreaId?: number | null }>, _count?: { __typename?: 'NetworkDeviceCount', NetworkDevices: number } | null }> };

export type CurrentSourceFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentSourceFiltersQuery = { __typename?: 'Query', CurrentSourceFilters: Array<{ __typename?: 'SystemFilter', Id: string, RuleName?: string | null, OrderNo: number, Ip: string, DeviceId?: string | null, SubnetId?: string | null, FilterAction: string, DetectedOn: any, UpdatedOn?: any | null, UpdatedBy?: string | null }> };

export type PendingSourceFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingSourceFiltersQuery = { __typename?: 'Query', PendingSourceFilters: Array<{ __typename?: 'SystemFilter', Id: string, RuleName?: string | null, OrderNo: number, Ip: string, DeviceId?: string | null, SubnetId?: string | null, DetectedOn: any }> };

export type UpdateFilterMutationVariables = Exact<{
  filter: SystemFilterInput;
}>;


export type UpdateFilterMutation = { __typename?: 'Mutation', UpdateFilter: { __typename?: 'SystemFilter', Id: string, RuleName?: string | null, OrderNo: number, Ip: string, DeviceId?: string | null, SubnetId?: string | null, FilterAction: string, DetectedOn: any, UpdatedOn?: any | null, UpdatedBy?: string | null } };

export type DeleteFilterMutationVariables = Exact<{
  filterIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteFilterMutation = { __typename?: 'Mutation', DeleteFilter: number };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', AllUsers: Array<{ __typename?: 'UserWithRoles', Id: string, Username: string, FirstName?: string | null, LastName?: string | null, CreatedOn: any, Roles?: Array<{ __typename?: 'UserRole', RoleName: string }> | null }> };


export const GetLoginKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetLoginKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetLoginKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<GetLoginKeyMutation, GetLoginKeyMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"Key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AccessToken"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"Roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RoleName"}},{"kind":"Field","name":{"kind":"Name","value":"Id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const ValidateAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ValidateAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"Roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"RoleName"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateAuthQuery, ValidateAuthQueryVariables>;
export const NetworkDevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NetworkDevices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryArguments"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rsip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NetworkDevices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"RSIP"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rsip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"Area"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}}]}},{"kind":"Field","name":{"kind":"Name","value":"NetworkBroadcaster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NetworkDevices"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"Channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"NodeDesc"}},{"kind":"Field","name":{"kind":"Name","value":"NodeNo"}},{"kind":"Field","name":{"kind":"Name","value":"NodeType"}},{"kind":"Field","name":{"kind":"Name","value":"Status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"StateName"}},{"kind":"Field","name":{"kind":"Name","value":"StateType"}},{"kind":"Field","name":{"kind":"Name","value":"StateValue"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Channels"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}}]}}]}}]} as unknown as DocumentNode<NetworkDevicesQuery, NetworkDevicesQueryVariables>;
export const SetDeviceDescDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetDeviceDesc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SetDeviceDesc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"DeviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"Description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Channels"}}]}}]}}]}}]} as unknown as DocumentNode<SetDeviceDescMutation, SetDeviceDescMutationVariables>;
export const SetDeviceNodeDescDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetDeviceNodeDesc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SetDeviceNodeDesc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NodeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"Description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"NodeDesc"}},{"kind":"Field","name":{"kind":"Name","value":"NodeNo"}},{"kind":"Field","name":{"kind":"Name","value":"NodeType"}},{"kind":"Field","name":{"kind":"Name","value":"Status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"StateName"}},{"kind":"Field","name":{"kind":"Name","value":"StateType"}},{"kind":"Field","name":{"kind":"Name","value":"StateValue"}}]}}]}}]}}]} as unknown as DocumentNode<SetDeviceNodeDescMutation, SetDeviceNodeDescMutationVariables>;
export const AddDeviceToRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDeviceToRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddDeviceToRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"DeviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"RoomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Channels"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}}]}}]}}]} as unknown as DocumentNode<AddDeviceToRoomMutation, AddDeviceToRoomMutationVariables>;
export const DelDeviceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DelDevice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DelDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"DeviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}}]}]}}]} as unknown as DocumentNode<DelDeviceMutation, DelDeviceMutationVariables>;
export const PropertiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceCount"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<PropertiesQuery, PropertiesQueryVariables>;
export const PropertyLevelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PropertyLevels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PropertyLevels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"PropertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceCount"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<PropertyLevelsQuery, PropertyLevelsQueryVariables>;
export const LevelUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LevelUnits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"levelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"LevelUnits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LevelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"levelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceCount"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<LevelUnitsQuery, LevelUnitsQueryVariables>;
export const AreaByKeywordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AreaByKeyword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AreaByKeyword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceCount"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<AreaByKeywordQuery, AreaByKeywordQueryVariables>;
export const SavePropertyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveProperty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"property"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyAreaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SaveProperty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Property"},"value":{"kind":"Variable","name":{"kind":"Name","value":"property"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<SavePropertyMutation, SavePropertyMutationVariables>;
export const SavePropertyLevelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePropertyLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"level"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LevelAreaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SavePropertyLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Level"},"value":{"kind":"Variable","name":{"kind":"Name","value":"level"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<SavePropertyLevelMutation, SavePropertyLevelMutationVariables>;
export const SavePropertyUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePropertyUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnitAreaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SavePropertyUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"ParentArea"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"SubAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Details"}},{"kind":"Field","name":{"kind":"Name","value":"ParentAreaId"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"BroadcasterId"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}}]}}]}}]}}]} as unknown as DocumentNode<SavePropertyUnitMutation, SavePropertyUnitMutationVariables>;
export const DeleteAreaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteArea"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"areaIdList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteArea"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"AreaIdList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"areaIdList"}}}]}]}}]} as unknown as DocumentNode<DeleteAreaMutation, DeleteAreaMutationVariables>;
export const NetworkBroadcastersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NetworkBroadcasters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryArguments"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NetworkBroadcasters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"AllowDevicesByDefault"}},{"kind":"Field","name":{"kind":"Name","value":"Enabled"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"EnabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledOn"}},{"kind":"Field","name":{"kind":"Name","value":"DisabledBy"}},{"kind":"Field","name":{"kind":"Name","value":"DetectedOn"}},{"kind":"Field","name":{"kind":"Name","value":"LastMsgOn"}},{"kind":"Field","name":{"kind":"Name","value":"NetworkDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"CustomDesc"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceType"}},{"kind":"Field","name":{"kind":"Name","value":"AreaId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NetworkDevices"}}]}}]}}]}}]} as unknown as DocumentNode<NetworkBroadcastersQuery, NetworkBroadcastersQueryVariables>;
export const CurrentSourceFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentSourceFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CurrentSourceFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"RuleName"}},{"kind":"Field","name":{"kind":"Name","value":"OrderNo"}},{"kind":"Field","name":{"kind":"Name","value":"Ip"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"FilterAction"}},{"kind":"Field","name":{"kind":"Name","value":"DetectedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}}]}}]} as unknown as DocumentNode<CurrentSourceFiltersQuery, CurrentSourceFiltersQueryVariables>;
export const PendingSourceFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PendingSourceFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PendingSourceFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"RuleName"}},{"kind":"Field","name":{"kind":"Name","value":"OrderNo"}},{"kind":"Field","name":{"kind":"Name","value":"Ip"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"DetectedOn"}}]}}]}}]} as unknown as DocumentNode<PendingSourceFiltersQuery, PendingSourceFiltersQueryVariables>;
export const UpdateFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SystemFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"RuleName"}},{"kind":"Field","name":{"kind":"Name","value":"OrderNo"}},{"kind":"Field","name":{"kind":"Name","value":"Ip"}},{"kind":"Field","name":{"kind":"Name","value":"DeviceId"}},{"kind":"Field","name":{"kind":"Name","value":"SubnetId"}},{"kind":"Field","name":{"kind":"Name","value":"FilterAction"}},{"kind":"Field","name":{"kind":"Name","value":"DetectedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedOn"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedBy"}}]}}]}}]} as unknown as DocumentNode<UpdateFilterMutation, UpdateFilterMutationVariables>;
export const DeleteFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeleteFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterIds"}}}]}]}}]} as unknown as DocumentNode<DeleteFilterMutation, DeleteFilterMutationVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"FirstName"}},{"kind":"Field","name":{"kind":"Name","value":"LastName"}},{"kind":"Field","name":{"kind":"Name","value":"Roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RoleName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"CreatedOn"}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;