import { Division } from "@prisma/client";
import { assertEnumType } from "graphql";
import {
    arg,
    enumType,
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
    subscriptionField,
    subscriptionType,
} from "nexus";

export const Shooter = objectType({
    name: "Shooter",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.dateTime("createdAt");
        t.nonNull.string("name");
        t.nonNull.field("division", { type: "Division" });
    },
});

export const ShooterMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createShooter", {
            type: "Shooter",
            args: {
                division: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            resolve(src, args, ctx, info) {
                return ctx.prisma.shooter.create({
                    data: {
                        division: args.division as Division,
                        name: args.name,
                    },
                });
            },
        });
        t.nonNull.field("updateShooter", {
            type: "Shooter",
            args: {
                id: nonNull(intArg()),
                division: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            resolve(src, args, ctx, info) {
                return ctx.prisma.shooter.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        division: args.division as Division,
                        name: args.name,
                    },
                });
            },
        });
        t.nonNull.field("deleteShooter", {
            type: "Shooter",
            args: {
                id: nonNull(intArg()),
            },
            resolve(src, args, ctx, info) {
                return ctx.prisma.shooter.delete({
                    where: {
                        id: args.id,
                    },
                });
            },
        });
    },
});

export const ShooterQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("getAllShooters", {
            type: "Shooter",
            resolve(src, args, ctx, info) {
                return ctx.prisma.shooter.findMany();
            },
        });
        t.field("getShooter", {
            type: "Shooter",
            args: {
                id: nonNull(intArg())
            },
            resolve(src, args, ctx, info) {
                return ctx.prisma.shooter.findFirstOrThrow({
                    where: {
                        id: args.id
                    }
                });
            },
        });
    },
});

export const ShooterSubscription = extendType({
    type: "Subscription",
    definition(t) {
        t.nonNull.boolean("subscribeToShooterUpdate", {
            subscribe: async function* (src, args, ctx, info) {
                while (true) {
                    await new Promise<void>((resolve) => {
                        let sub_id: number;
                        sub_id = ctx.subscribe(
                            "Shooter",
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
