import prisma from "database";

async function clearDatabase() {
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
}

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect(); 
});
