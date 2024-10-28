import prisma from "database";
import { faker } from "@faker-js/faker"

export async function createNewTicket(id: number) {
    return await prisma.ticket.create({
        data: await createTicketData(id)
    });
}

export async function createTicketData(eventId: number) {
    let uniqueCode = faker.string.numeric();

    while (await codeExistsForEvent(uniqueCode, eventId)) {
        uniqueCode = faker.string.numeric(); 
    }

    const ticketData = {
        owner: faker.person.fullName(),
        code: uniqueCode,
        eventId   
    };

    return ticketData;
}

async function codeExistsForEvent(code: string, eventId: number) {
    const existingTicket = await prisma.ticket.findFirst({
        where: {
            code,
            eventId
        }
    });

    return !!existingTicket;
}