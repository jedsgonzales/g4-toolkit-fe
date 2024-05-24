import { gql } from "@apollo/client";

export const GET_AUTH_KEY = gql`
  mutation GetLoginKey($username: String!) {
    GetLoginKey(Username: $username)
  }
`;

export const AUTHENTICATE = gql`
  mutation SignIn($username: String!, $key: String!) {
    SignIn(Username: $username, Key: $key) {
      AccessToken
      User {
        Id
        Username
        FirstName
        LastName
        Email
        CreatedOn
        Roles {
          RoleName
          Id
        }
      }
    }
  }
`;

export const VALIDATE_TOKEN = gql`
  query ValidateAuth {
    ValidateAuth {
      Id
      Username
      FirstName
      LastName
      Email
      CreatedOn
      Roles {
        Id
        RoleName
      }
    }
  }
`;
