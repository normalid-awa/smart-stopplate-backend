import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";
// import { GraphQLServer } from "graphql-yoga";
import { createSchema, createYoga } from "graphql-yoga";
// import { createServer } from "node:http";
import { createServer as createHttpsServer } from "https";
import { createServer as createHttpServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
const fs = require("fs");
const env = require("dotenv").config();
const port = process.env.GQL_PORT;

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
    graphiql: {
        subscriptionsProtocol: "WS",
    },
});

// Get NodeJS Server from Yoga
// const httpServer = createServer(yoga);

let CERT_STRING;
try {
    CERT_STRING = fs.readFileSync(process.env.SSL_CERT_LOCATE);
} catch (e) {
    CERT_STRING = "";
}

let KEY_STRING;
try {
    KEY_STRING = fs.readFileSync(process.env.SSL_KEY_LOCATE);
} catch (e) {
    KEY_STRING = "";
}

let httpServer;
if (process.env.USE_HTTPS == "true") {
    httpServer = createHttpsServer(
        {
            cert: CERT_STRING,
            key: KEY_STRING,
        },
        yoga
    );
} else {
    httpServer = createHttpServer(
        yoga
    );
}

// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: yoga.graphqlEndpoint,
});

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
    {
        execute: (args: any) => args.rootValue.execute(args),
        subscribe: (args: any) => args.rootValue.subscribe(args),
        onSubscribe: async (ctx, msg) => {
            const {
                schema,
                execute,
                subscribe,
                contextFactory,
                parse,
                validate,
            } = yoga.getEnveloped({
                ...ctx,
                req: ctx.extra.request,
                socket: ctx.extra.socket,
                params: msg.payload,
            });

            const args = {
                schema,
                operationName: msg.payload.operationName,
                document: parse(msg.payload.query),
                variableValues: msg.payload.variables,
                contextValue: await contextFactory(),
                rootValue: {
                    execute,
                    subscribe,
                },
            };

            const errors = validate(args.schema, args.document);
            if (errors.length) return errors;
            return args;
        },
    },
    wsServer
);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const server = createServer(yoga);
// server.listen(port, () =>
//     console.log(`Server is running on http://localhost:${port}`)
// );
