import { extendType, intArg, nonNull, objectType } from "nexus";

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

        t.nonNull.int("totalScore");

        t.nonNull.int("time");

        t.nonNull.int("hitFactor");
    },
});


