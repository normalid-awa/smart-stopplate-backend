import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "./build/schema.graphql",
    generates: {
        "build/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};

export default config;
