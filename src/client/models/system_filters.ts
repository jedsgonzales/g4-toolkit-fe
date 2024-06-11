import { gql } from "@apollo/client";

export const GET_EXISTING_FILTERS = gql`
  query CurrentSourceFilters {
    CurrentSourceFilters {
      Id
      RuleName
      OrderNo
      Ip
      DeviceId
      SubnetId
      FilterAction
      DetectedOn
      UpdatedOn
      UpdatedBy
    }
  }
`;

export const GET_PENDING_FILTERS = gql`
  query PendingSourceFilters {
    PendingSourceFilters {
      Id
      RuleName
      OrderNo
      Ip
      DeviceId
      SubnetId
      DetectedOn
    }
  }
`;

export const UPDATE_SOURCE_FILTER = gql`
  mutation UpdateFilter($filter: SystemFilterInput!) {
    UpdateFilter(filter: $filter) {
      Id
      RuleName
      OrderNo
      Ip
      DeviceId
      SubnetId
      FilterAction
      DetectedOn
      UpdatedOn
      UpdatedBy
    }
  }
`;

export const DEL_SOURCE_FILTER = gql`
  mutation DeleteFilter($filterIds: [String!]!) {
    DeleteFilter(filterIds: $filterIds)
  }
`;
