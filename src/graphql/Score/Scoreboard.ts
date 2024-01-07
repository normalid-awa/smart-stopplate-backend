import { objectType } from "nexus";

export const Scoreboard = objectType({
    name: "Scoreboard",
    description: "The the collection of Scorelist",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.dateTime("createdAt");
        t.nonNull.string("name");
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
