import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Scorelist = objectType({
    name: "Scorelist",
    description: "The the collection of Score",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.dateTime("createdAt");
        t.nonNull.field("stage", {
            type: "Stage",
            resolve(src, args, ctx) {
                return ctx.prisma.scorelist
                    .findUniqueOrThrow({
                        where: { id: src.id },
                    })
                    .Stage();
            },
        });
        t.nonNull.field("scoreboard", {
            type: "Scoreboard",
            resolve(src, args, ctx) {
                return ctx.prisma.scorelist
                    .findUniqueOrThrow({
                        where: { id: src.id },
                    })
                    .Scoreboard();
            },
        });
        t.nonNull.list.nonNull.field("scores", {
            type: "Score",
            resolve(src, args, ctx) {
                return ctx.prisma.scorelist
                    .findUniqueOrThrow({
                        where: { id: src.id },
                    })
                    .Scores();
            },
        });
        t.nonNull.boolean("isLocked");
        t.nonNull.int("rounds");
    },
});

export const ScorelistQurey = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllScorelists", {
            type: "Scorelist",
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scorelist.findMany();
            },
        });
        t.nonNull.field("getScorelist", {
            type: "Scorelist",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scorelist.findUniqueOrThrow({
                    where: {
                        id: args.id,
                    },
                });
            },
        });
    },
});

export const ScorelistMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createScorelist", {
            type: "Scorelist",
            args: {
                stageId: nonNull(intArg()),
                scoreboardId: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scorelist.create({
                    data: {
                        Scoreboard: { connect: { id: args.scoreboardId } },
                        Stage: { connect: { id: args.stageId } },
                    },
                });
            },
        });
        t.nonNull.field("deleteScorelist", {
            type: "Scorelist",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scorelist.delete({ where: { id: args.id } });
            },
        });
        t.nonNull.field("lockScorelist", {
            type: "Scorelist",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scorelist.update({
                    where: { id: args.id },
                    data: {
                        isLocked: true,
                    },
                });
            },
        });
        t.nonNull.field("addNewRound", {
            type: "Scorelist",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scorelist.update({
                    where: { id: args.id },
                    data: {
                        rounds: {
                            increment: 1
                        }
                    }
                });
            },
        });
    },
});

export const ScorelistSubscription = extendType({
    type: "Subscription",
    definition(t) {
        t.nonNull.field("subscribeToScorelistUpdate", {
            type: "Boolean",
            subscribe: async function* (src, args, ctx, info) {
                while (true) {
                    await new Promise<void>((resolve) => {
                        let sub_id: number;
                        sub_id = ctx.subscribe(
                            "Scorelist",
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
