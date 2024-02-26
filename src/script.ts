// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
    let resuklt = await prisma.proError.create({
        data: {
            proErrorItemId: 1,
            scoreId: 83,
            count: 1,
        },
    });
    console.log(resuklt)
}

// 4
main()
    .catch((e) => {
        throw e;
    })
    // 5
    .finally(async () => {
        await prisma.$disconnect();
    });
