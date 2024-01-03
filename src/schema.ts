import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";   // 1


export const schema = makeSchema({
    types: types, // 1
    outputs: {
        //The first output file that Nexus will generate for you is a GraphQL
        //schema file of type .graphql. This is the GraphQL Schema Definition
        //Language (SDL) for defining the structure of your API. You will learn
        //more about this later in the chapter!
        schema: join(process.cwd(), "build", "schema.graphql"), // 2
        // The second output file is a TypeScript file known as typegen, which
        // will contain TypeScript type definitions for all types in your
        // GraphQL schema. These generated types will help ensure typesafety in
        // your application code and keep your GraphQL schema definition in sync
        // with your schema implementation. Again, more on this later.
        typegen: join(process.cwd(), "build", "nexus-typegen.d.ts"), // 3
    },
    contextType: {
        module: join(process.cwd(), "./src/context.ts"), // 1
        export: "Context", // 2
    },
});
