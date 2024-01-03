import {
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
} from "nexus";
import { NexusGenObjects } from "../../build/nexus-typegen";

export const Link = objectType({
    name: "Link", // 1
    definition(t) {
        // 2
        t.nonNull.int("id"); // 3
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5
    },
});

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context) {
                return context.prisma.link.findMany(); // 1
            },
        });
    },
});
