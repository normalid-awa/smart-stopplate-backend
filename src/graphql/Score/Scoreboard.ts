import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Scoreboard = objectType({
    name: "Scoreboard",
    description: "The the collection of Scorelist",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.dateTime("createdAt");
        t.nonNull.string("name");
        t.nonNull.boolean("isLocked");
        t.nonNull.list.nonNull.field("scorelists", {
            type: "Scorelist",
            resolve(src, args, ctx) {
                return ctx.prisma.scoreboard
                    .findUniqueOrThrow({
                        where: { id: src.id },
                    })
                    .Scorelists();
            },
        });
    },
});

export const ScoreboardQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllScoreboards", {
            type: "Scoreboard",
            resolve: (src, args, ctx) => {
                return ctx.prisma.scoreboard.findMany();
            },
        });
        t.nonNull.field("getScoreboard", {
            type: "Scoreboard",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx) => {
                return ctx.prisma.scoreboard.findUniqueOrThrow({
                    where: { id: args.id },
                });
            },
        });
    },
});

export const ScoreboardMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createScoreboard", {
            type: "Scoreboard",
            args: {
                name: nonNull(stringArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scoreboard.create({
                    data: {
                        name: args.name,
                    },
                });
            },
        });
        t.nonNull.field("updateScoreboard", {
            type: "Scoreboard",
            args: {
                id: nonNull(intArg()),
                name: nonNull(stringArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scoreboard.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        name: args.name,
                    },
                });
            },
        });
        t.nonNull.field("deleteScoreboard", {
            type: "Scoreboard",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scoreboard.delete({ where: { id: args.id } });
            },
        });
        t.nonNull.field("lockScoreboard", {
            type: "Scoreboard",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.scoreboard.update({
                    where: { id: args.id },
                    data: {
                        isLocked: true,
                    },
                });
            },
        });
    },
});

export const ScoreboardSubscription = extendType({
    type: "Subscription",
    definition(t) {
        t.nonNull.field("subscribeToScoreboardUpdate", {
            type: "Boolean",
            subscribe: async function* (src, args, ctx, info) {
                while (true) {
                    await new Promise<void>((resolve) => {
                        let sub_id: number;
                        sub_id = ctx.subscribe(
                            "Scoreboard",
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
