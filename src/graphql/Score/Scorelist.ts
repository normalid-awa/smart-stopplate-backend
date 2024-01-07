import { objectType } from "nexus";

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
    },
});
