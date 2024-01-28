import { extendType, objectType } from "nexus";

export const Dq = objectType({
    name: "Dq",
    description: "Dq reason",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("index", {
            description: `
                The index that locate in the rulebook
            `
        })
        t.nonNull.string("category");
        t.nonNull.string("category_zh");
        t.nonNull.string("content");
        t.nonNull.string("content_zh");
    },
});

export const DqQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllDqReason", {
            type: "Dq",
            resolve: (src, args, ctx, info) => {
                return ctx.prisma.dqReason.findMany();
            },
        });
    },
})


export const ProError = objectType({
    name: "ProError",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("index", {
            deprecation: `
                The index locate in the rulebook
            `,
        });
        t.nonNull.string("big_title");
        t.nonNull.string("big_title_zh");
        t.nonNull.string("content");
        t.nonNull.string("content_zh");
        t.nonNull.boolean("single_punishment");
    },
});

export const ProErrorQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllProError", {
            type: "ProError",
            resolve: (src, args, ctx, info) => {
                return ctx.prisma.proErrorReason.findMany();
            },
        });
    },
});