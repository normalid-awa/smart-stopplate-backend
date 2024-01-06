import { Prisma, PrismaClient } from "@prisma/client";
import { Request } from "express";

export const prisma = new PrismaClient();

interface SubscribeList {
    cb: Function;
    model: Prisma.ModelName;
    action: Prisma.PrismaAction[];
}
var subscribeList: SubscribeList[] = [];

prisma.$use(async (params, next) => {
    // Manipulate params here
    const result = await next(params);
    console.log(result, params);

    subscribeList.forEach((sub_info) => {
        if (
            sub_info.action.includes(params.action) &&
            sub_info.model == params.model
        ) {
            sub_info.cb();
        }
    });
    // See results here
    return result;
});

function subscribe(
    model: Prisma.ModelName,
    action: Prisma.PrismaAction[],
    cb: Function
): number {
    let index = subscribeList.length;
    subscribeList[subscribeList.length] = { cb, model, action };
    return index;
}
function unsubscribe(index: number) {
    delete subscribeList[index];
}

export interface Context {
    prisma: PrismaClient;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    userId?: number; // 1
}

export const context = ({ req }: { req: Request }): Context => {
    return {
        prisma,
        subscribe,
        unsubscribe,
    };
};
