import { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv/config';

console.log('API', process.env.GRAPH_API);

const config: CodegenConfig = {
  schema: process.env.GRAPH_API,
  documents: ["src/client/**/*.ts", "src/client/**/*.tsx"],
  generates: {
    "src/client/types/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      /* plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "typescript-resolvers",
      ], */
      config: {
        withHooks: true,
      },
    }
  },
  ignoreNoDocuments: true,
};

export default config;
