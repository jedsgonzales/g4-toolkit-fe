import { gql } from "@apollo/client";

export const LIST_PROPERTIES = gql`
  query Properties {
    Properties {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
      SubAreas {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
    }
  }
`;

export const LIST_PROPERTY_LEVELS = gql`
  query PropertyLevels($propertyId: Int!) {
    PropertyLevels(PropertyId: $propertyId) {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
      ParentArea {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
      SubAreas {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
    }
  }
`;

export const LIST_PROPERTY_LEVEL_UNITS = gql`
  query LevelUnits($levelId: Int!) {
    LevelUnits(LevelId: $levelId) {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
      ParentArea {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
    }
  }
`;

export const LIST_AREA_BY_KEYWORD = gql`
  query AreaByKeyword($filter: String!) {
    AreaByKeyword(filter: $filter) {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
      ParentArea {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
      SubAreas {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
      Devices {
        Id
        CustomDesc
        DeviceId
        SubnetId
        DeviceType
        BroadcasterId
        AreaId
        Enabled
        EnabledOn
        EnabledBy
        DisabledOn
        DisabledBy
      }
    }
  }
`;

export const SAVE_PROPERTY = gql`
  mutation SaveProperty($property: PropertyAreaInput!) {
    SaveProperty(Property: $property) {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
    }
  }
`;

export const SAVE_PROPERTY_LEVEL = gql`
  mutation SavePropertyLevel($level: LevelAreaInput!) {
    SavePropertyLevel(Level: $level) {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
      ParentArea {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
      SubAreas {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
    }
  }
`;

export const SAVE_PROPERTY_LEVEL_UNIT = gql`
  mutation SavePropertyUnit($unit: UnitAreaInput!) {
    SavePropertyUnit(Unit: $unit) {
      Id
      Name
      Type
      Details
      ParentAreaId
      CreatedOn
      CreatedBy
      UpdatedOn
      UpdatedBy
      ParentArea {
        Id
        Name
        Type
        Details
        ParentAreaId
        CreatedOn
        CreatedBy
        UpdatedOn
        UpdatedBy
      }
    }
  }
`;
