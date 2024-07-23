import { gql } from "@apollo/client";

export const QUERY_RSIP_LIST = gql`
  query NetworkBroadcasters($query: QueryArguments) {
    NetworkBroadcasters(Query: $query) {
      Id
      Name
      AllowDevicesByDefault
      Enabled
      EnabledOn
      EnabledBy
      DisabledOn
      DisabledBy
      DetectedOn
      LastMsgOn
      NetworkDevices {
        Id
        CustomDesc
        DeviceId
        SubnetId
        DeviceType
        AreaId
      }
      _count {
        NetworkDevices
      }
    }
  }
`;
