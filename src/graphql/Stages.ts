import {
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
} from "nexus";

export const Stage = objectType({
    name: "Stage", // 1
    definition(t) {
        // 2
        t.nonNull.int("id");
        t.nonNull.dateTime("createdAt");
        t.nonNull.string("name");
        t.nonNull.string("description");
        t.nonNull.int("paperTargets");
        t.nonNull.int("noShoots");
        t.nonNull.int("popperTargets");
        t.nonNull.boolean("isLocked");
        t.nonNull.int("condition");
        t.nonNull.int("minimumRounds", {
            resolve: (src, args, ctx, inf) => {
                return src.paperTargets * 2 + src.popperTargets;
            },
        });
        t.nonNull.int("maximumPoints", {
            resolve: (src, args, ctx, inf) => {
                return src.paperTargets * 2 * 5 + src.popperTargets * 5;
            },
        });
        t.nonNull.string("type", {
            description: "only return short,medium,long and other",
            resolve: (src, args, ctx, inf) => {
                let max = src.paperTargets * 2 + src.popperTargets;
                if (max <= 12) {
                    return "short"
                } else if (max <= 24) {
                    return "medium"
                } else if (max <= 32) {
                    return "long"
                } else {
                    return "other"
                }
            },
        });
    },
});

export const StageQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllStages", {
            type: "Stage",
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.findMany();
            },
        });
        t.nonNull.field("getStage", {
            type: "Stage",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.findFirstOrThrow({
                    where: { id: args.id },
                });
            },
        });
    },
});

export const StageMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createStage", {
            type: "Stage",
            args: {
                name: nonNull(stringArg()),
                description: nonNull(stringArg()),
                paperTargets: nonNull(intArg()),
                noShoots: nonNull(intArg()),
                popperTargets: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.create({
                    data: {
                        description: args.description,
                        name: args.name,
                        noShoots: args.noShoots,
                        paperTargets: args.paperTargets,
                        popperTargets: args.popperTargets,
                    },
                });
            },
        });
        t.nonNull.field("deleteStage", {
            type: "Stage",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.delete({ where: { id: args.id } });
            },
        });
        t.nonNull.field("lockStage", {
            type: "Stage",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.update({
                    where: { id: args.id },
                    data: {
                        isLocked: true,
                    },
                });
            },
        });
    },
});
