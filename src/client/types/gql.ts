/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation GetLoginKey($username: String!) {\n    GetLoginKey(Username: $username)\n  }\n": types.GetLoginKeyDocument,
    "\n  mutation SignIn($username: String!, $key: String!) {\n    SignIn(Username: $username, Key: $key) {\n      AccessToken\n      User {\n        Id\n        Username\n        FirstName\n        LastName\n        Email\n        CreatedOn\n        Roles {\n          RoleName\n          Id\n        }\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  query ValidateAuth {\n    ValidateAuth {\n      Id\n      Username\n      FirstName\n      LastName\n      Email\n      CreatedOn\n      Roles {\n        Id\n        RoleName\n      }\n    }\n  }\n": types.ValidateAuthDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation GetLoginKey($username: String!) {\n    GetLoginKey(Username: $username)\n  }\n"): (typeof documents)["\n  mutation GetLoginKey($username: String!) {\n    GetLoginKey(Username: $username)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($username: String!, $key: String!) {\n    SignIn(Username: $username, Key: $key) {\n      AccessToken\n      User {\n        Id\n        Username\n        FirstName\n        LastName\n        Email\n        CreatedOn\n        Roles {\n          RoleName\n          Id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($username: String!, $key: String!) {\n    SignIn(Username: $username, Key: $key) {\n      AccessToken\n      User {\n        Id\n        Username\n        FirstName\n        LastName\n        Email\n        CreatedOn\n        Roles {\n          RoleName\n          Id\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ValidateAuth {\n    ValidateAuth {\n      Id\n      Username\n      FirstName\n      LastName\n      Email\n      CreatedOn\n      Roles {\n        Id\n        RoleName\n      }\n    }\n  }\n"): (typeof documents)["\n  query ValidateAuth {\n    ValidateAuth {\n      Id\n      Username\n      FirstName\n      LastName\n      Email\n      CreatedOn\n      Roles {\n        Id\n        RoleName\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;