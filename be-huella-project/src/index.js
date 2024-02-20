import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function mainDir(){

    const newUsers = await prisma.user.findMany();
    // newUsers.forEach(element => {
    //     console.log(`${element.id} - ${element.username}`);
    // });
    console.log(newUsers);
}

mainDir()

