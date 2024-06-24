import { gql } from "@apollo/client";

export const GET_ALL_DEVICES = gql`
  query AllDevices {
    AllDevices {
      Id
      Enabled
      DeviceType
      DeviceId
      AreaId
      SubnetId
    }
  }
`;
