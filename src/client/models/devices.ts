import { gql } from "@apollo/client";

export const GET_DEVICES = gql`
  query NetworkDevices($query: QueryArguments, $rsip: String) {
    NetworkDevices(Query: $query, RSIP: $rsip) {
      Id
      CustomDesc
      DeviceId
      SubnetId
      DeviceType
      EnabledOn
      Area {
        Id
        Name
        ParentAreaId
        Type
        Details
      }
      NetworkBroadcaster {
        Id
        Name
        _count {
          NetworkDevices
        }
      }
      Channels {
        Id
        CustomDesc
        NodeDesc
        NodeNo
        NodeType
        Status {
          Id
          StateName
          StateType
          StateValue
        }
      }
      _count {
        Channels
      }
      Enabled
      DisabledBy
      EnabledBy
      DisabledOn
    }
  }
`;

export const SET_DEVICE_DESC = gql`
  mutation SetDeviceDesc($deviceId: Int!, $description: String!) {
    SetDeviceDesc(DeviceId: $deviceId, Description: $description) {
      Id
      Enabled
      CustomDesc
      DeviceId
      SubnetId
      DeviceType
      _count {
        Channels
      }
    }
  }
`;

export const SET_DEVICE_NODE_DESC = gql`
  mutation SetDeviceNodeDesc($nodeId: Int!, $description: String!) {
    SetDeviceNodeDesc(NodeId: $nodeId, Description: $description) {
      CustomDesc
      Id
      NodeDesc
      NodeNo
      NodeType
      Status {
        Id
        StateName
        StateType
        StateValue
      }
    }
  }
`;

export const SET_DEVICE_LOCATION = gql`
  mutation AddDeviceToRoom($deviceId: Int!, $roomId: Int) {
    AddDeviceToRoom(DeviceId: $deviceId, RoomId: $roomId) {
      Id
      DeviceId
      SubnetId
      DeviceType
      _count {
        Channels
      }
      Enabled
      CustomDesc
      AreaId
    }
  }
`;

export const DEL_DEVICE = gql`
  mutation DelDevice($deviceId: Int!) {
    DelDevice(DeviceId: $deviceId)
  }
`;
