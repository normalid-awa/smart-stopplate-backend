import { StageType } from "@prisma/client";
import {
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
    subscriptionField,
    subscriptionType,
} from "nexus";

function determine_stage_type(pappers: number, poppers: number): StageType {
    let max = pappers * 2 + poppers;
    if (max <= 12) {
        return "SHORT";
    } else if (max <= 24) {
        return "MEDIUM";
    } else if (max <= 32) {
        return "LONG";
    } else {
        return "OTHER";
    }
}

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
        t.nonNull.field("type", { type: "StageType" });
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
                condition: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.create({
                    data: {
                        type: determine_stage_type(
                            args.paperTargets,
                            args.popperTargets
                        ),
                        description: args.description,
                        name: args.name,
                        noShoots: args.noShoots,
                        paperTargets: args.paperTargets,
                        popperTargets: args.popperTargets,
                        condition: args.condition,
                    },
                });
            },
        });
        t.nonNull.field("updateStage", {
            type: "Stage",
            args: {
                id: nonNull(intArg()),
                name: nonNull(stringArg()),
                description: nonNull(stringArg()),
                paperTargets: nonNull(intArg()),
                noShoots: nonNull(intArg()),
                popperTargets: nonNull(intArg()),
                condition: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.stage.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        type: determine_stage_type(
                            args.paperTargets,
                            args.popperTargets
                        ),
                        description: args.description,
                        name: args.name,
                        noShoots: args.noShoots,
                        paperTargets: args.paperTargets,
                        popperTargets: args.popperTargets,
                        condition: args.condition,
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

export const StageSubscription = extendType({
    type: "Subscription",
    definition(t) {
        t.nonNull.field("subscribeToStageUpdate", {
            type: "Boolean",
            subscribe: async function* (src, args, ctx, info) {
                while (true) {
                    await new Promise<void>((resolve) => {
                        let sub_id: number;
                        sub_id = ctx.subscribe(
                            "Stage",
                            [
                                "create",
                                "update",
                                "delete",
                                "deleteMany",
                                "createMany",
                                "updateMany",
                                "upsert",
                            ],
                            () => {
                                ctx.unsubscribe(sub_id);
                                resolve();
                            }
                        );
                    });
                    yield true;
                }
            },
            resolve(eventData) {
                return eventData;
            },
        });
    },
});
