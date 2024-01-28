import { GraphQLError } from "graphql";
import {
    arg,
    extendType,
    floatArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
} from "nexus";

function calc_score(
    a: number,
    c: number,
    d: number,
    m: number,
    pp: number,
    ns: number,
    pe: number
) {
    return a * 5 + c * 3 + d + pp * 5 - (ns * 10 + m * 10 + pe * 10);
}
function calc_hf(score: number, time: number) {
    if (time == 0) return 0;
    return score / time;
}

export const Score = objectType({
    name: "Score",
    description: "The single record in Scorelist",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.dateTime("createdAt");
        t.nonNull.field("scorelist", {
            type: "Scorelist",
            resolve(src, args, ctx) {
                return ctx.prisma.score
                    .findUniqueOrThrow({ where: { id: src.id } })
                    .Scorelist();
            },
        });
        t.nonNull.field("shooter", {
            type: "Shooter",
            resolve(src, args, ctx) {
                return ctx.prisma.score
                    .findUniqueOrThrow({ where: { id: src.id } })
                    .Shooter();
            },
        });

        t.nonNull.int("alphaZone");
        t.nonNull.int("charlieZone");
        t.nonNull.int("deltaZone");
        t.nonNull.int("noShoots");
        t.nonNull.int("miss");

        t.nonNull.int("poppers");

        t.nonNull.int("proError");

        t.nonNull.int("totalScore", {
            resolve(src) {
                return calc_score(
                    src.alphaZone,
                    src.charlieZone,
                    src.deltaZone,
                    src.miss,
                    src.poppers,
                    src.noShoots,
                    src.proError
                );
            },
        });

        t.nonNull.float("time");

        t.nonNull.float("hitFactor", {
            resolve(src, args, ctx, info) {
                return calc_hf(
                    calc_score(
                        src.alphaZone,
                        src.charlieZone,
                        src.deltaZone,
                        src.miss,
                        src.poppers,
                        src.noShoots,
                        src.proError
                    ),
                    src.time
                );
            },
        });

        t.nonNull.int("round");

        t.nonNull.field("scoreState", { type: "ScoreState" });
    },
});

export const ScoreQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getAllScores", {
            type: "Score",
            resolve: (src, args, ctx, info) => {
                return ctx.prisma.score.findMany();
            },
        });
        t.nonNull.list.nonNull.field("getScores", {
            type: "Score",
            args: {
                scorelistId: intArg(),
                shooterId: intArg(),
                round: intArg(),
                scoreState: arg({ type: "ScoreState" }),
            },
            resolve: (src, args, ctx, info) => {
                return ctx.prisma.score.findMany({
                    where: {
                        scorelistId: args.scorelistId ?? undefined,
                        shooterId: args.shooterId ?? undefined,
                        round: args.round ?? undefined,
                        scoreState: args.scoreState ?? undefined,
                    },
                });
            },
        });
        t.nonNull.field("getScore", {
            type: "Score",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, info) => {
                return ctx.prisma.score.findUniqueOrThrow({
                    where: {
                        id: args.id,
                    },
                });
            },
        });
    },
});

export const ScoreMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createScore", {
            type: "Score",
            args: {
                scorelistId: nonNull(intArg()),
                shooterId: nonNull(intArg()),
                round: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.score.create({
                    data: {
                        Scorelist: { connect: { id: args.scorelistId } },
                        Shooter: { connect: { id: args.shooterId } },
                        round: args.round
                    },
                });
            },
        });
        t.nonNull.field("assignScore", {
            type: "Score",
            args: {
                id: nonNull(intArg()),

                alphaZone: nonNull(intArg()),
                charlieZone: nonNull(intArg()),
                deltaZone: nonNull(intArg()),
                noShoots: nonNull(intArg()),
                miss: nonNull(intArg()),

                poppers: nonNull(intArg()),
                proError: nonNull(intArg()),
                time: nonNull(floatArg()),
            },
            resolve: async (src, args, ctx, inf) => {
                let score_record = await ctx.prisma.score.findUniqueOrThrow({
                    where: {
                        id: args.id,
                    },
                });
                if (score_record.scoreState !== "HAVE_NOT_SCORED_YET") {
                    throw new GraphQLError("The score have been assigned");
                }

                let score = calc_score(
                    args.alphaZone,
                    args.charlieZone,
                    args.deltaZone,
                    args.miss,
                    args.poppers,
                    args.noShoots,
                    args.proError
                );
                return ctx.prisma.score.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        alphaZone: args.alphaZone,
                        charlieZone: args.charlieZone,
                        deltaZone: args.deltaZone,
                        noShoots: args.noShoots,
                        miss: args.miss,
                        poppers: args.poppers,
                        proError: args.proError,
                        totalScore: score,
                        time: args.time,
                        hitFactor: calc_hf(score, args.time),
                        scoreState: "SCORED",
                    },
                });
            },
        });
        t.nonNull.field("updateScore", {
            type: "Score",
            args: {
                id: nonNull(intArg()),

                alphaZone: nonNull(intArg()),
                charlieZone: nonNull(intArg()),
                deltaZone: nonNull(intArg()),
                noShoots: nonNull(intArg()),
                miss: nonNull(intArg()),

                poppers: nonNull(intArg()),
                proError: nonNull(intArg()),
                time: nonNull(floatArg()),
            },
            resolve: async (src, args, ctx, inf) => {
                let score_record = await ctx.prisma.score.findUniqueOrThrow({
                    where: {
                        id: args.id,
                    },
                });
                if (score_record.scoreState !== "SCORED") {
                    throw new GraphQLError("The score haven't assigned yet");
                }

                let score = calc_score(
                    args.alphaZone,
                    args.charlieZone,
                    args.deltaZone,
                    args.miss,
                    args.poppers,
                    args.noShoots,
                    args.proError
                );
                return ctx.prisma.score.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        alphaZone: args.alphaZone,
                        charlieZone: args.charlieZone,
                        deltaZone: args.deltaZone,
                        noShoots: args.noShoots,
                        miss: args.miss,
                        poppers: args.poppers,
                        proError: args.proError,
                        totalScore: score,
                        time: args.time,
                        hitFactor: calc_hf(score, args.time),
                    },
                });
            },
        });
        t.nonNull.field("setScoreDNF", {
            type: "Score",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.score.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        scoreState: "DNF",
                    },
                });
            },
        });
        t.nonNull.field("setScoreDQ", {
            type: "Score",
            args: {
                id: nonNull(intArg()),
                dq_reason: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.score.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        scoreState: "DQ",
                        dqReason: { connect: { id: args.dq_reason } },
                    },
                });
            },
        });
        t.nonNull.field("resetScore", {
            type: "Score",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.score.update({
                    where: { id: args.id },
                    data: {
                        alphaZone: 0,
                        charlieZone: 0,
                        deltaZone: 0,
                        noShoots: 0,
                        miss: 0,
                        poppers: 0,
                        proError: 0,
                        totalScore: 0,
                        time: 0,
                        hitFactor: 0,
                        scoreState: "HAVE_NOT_SCORED_YET",
                    },
                });
            },
        });
        t.nonNull.field("deleteScore", {
            type: "Score",
            args: {
                id: nonNull(intArg()),
            },
            resolve: (src, args, ctx, inf) => {
                return ctx.prisma.score.delete({ where: { id: args.id } });
            },
        });
        t.field("swapScoreId", {
            type: "Boolean",
            args: {
                id1: nonNull(intArg()),
                id2: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, inf) => {
                let largest_id = (await ctx.prisma.score.findFirst({
                    orderBy: {
                        id: "asc"
                    }
                }));
                if (!largest_id)
                    return false;
                let length = largest_id.id;
                await ctx.prisma.score.update({
                    where: {
                        id: args.id1,
                    },
                    data: {
                        id: length + 1,
                    },
                });
                await ctx.prisma.score.update({
                    where: {
                        id: args.id2,
                    },
                    data: {
                        id: args.id1,
                    },
                });
                await ctx.prisma.score.update({
                    where: {
                        id: length + 1,
                    },
                    data: {
                        id: args.id2,
                    },
                });
                return true
            },
        });
    },
});

export const ScoreSubscription = extendType({
    type: "Subscription",
    definition(t) {
        t.nonNull.field("subscribeToScoreUpdate", {
            type: "Boolean",
            subscribe: async function* (src, args, ctx, info) {
                while (true) {
                    await new Promise<void>((resolve) => {
                        let sub_id: number;
                        sub_id = ctx.subscribe(
                            "Score",
                            [
                                "create",
                                "update",
                                "delete",
                                "deleteMany",
                                "createMany",
                                "updateMany",
                                "upsert",
                                "updateMany",
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
