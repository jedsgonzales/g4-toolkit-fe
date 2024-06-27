import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query AllUsers {
    AllUsers {
      Id
      Username
      FirstName
      LastName
      Roles {
        RoleName
      }
      CreatedOn
    }
  }
`;
