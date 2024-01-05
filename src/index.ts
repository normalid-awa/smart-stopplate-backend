import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";
// import { GraphQLServer } from "graphql-yoga";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const port = 8080;

// export const server = new ApolloServer({
//     schema,
//     context,
// });

// server.listen({ port }).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });

const yoga = createYoga({
    schema: schema,
    context: context,
    logging: {
        debug: console.log,
        error: console.log,
        info: console.log,
        warn: console.log,
    },
    
});
const server = createServer(yoga);
server.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
