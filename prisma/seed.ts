import { prisma } from "../src/database/PrismaClient";
import { users } from "./users";

async function main() {
    for (let user of users) {
        await prisma.user.create({
            data: user
        })
    }
}

main().catch (err => {
    console.error(err);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
    process.exit(0);
});
