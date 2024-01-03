import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";   

const port = 8080;

export const server = new ApolloServer({
    schema,
    context,
});

// 2
server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
