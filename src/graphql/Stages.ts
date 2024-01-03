import {
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
} from "nexus";
import { NexusGenObjects } from "../../build/nexus-typegen";

export const Stages = objectType({
    name: "Stages", // 1
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
    },
});

export const StagesQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllStages", {
            type: "Stages",
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stages.findMany();
            },
        });
    },
});

export const StagesMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createStage", {
            type: "Stages",
            args: {
                name: nonNull(stringArg()),
                description: nonNull(stringArg()),
                paperTargets: nonNull(intArg()),
                noShoots: nonNull(intArg()),
                popperTargets: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stages.create({
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
            type: "Stages",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stages.delete({ where: { id: args.id } });
            },
        });
        t.nonNull.field("lockStage", {
            type: "Stages",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stages.update({
                    where: { id: args.id },
                    data: {
                        isLocked: true,
                    },
                });
            },
        });
    },
});
