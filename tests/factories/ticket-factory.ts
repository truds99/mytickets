import prisma from "database";
import { faker } from "@faker-js/faker"

export async function createNewTicket(id: number) {
    return await prisma.ticket.create({
        data: createTicketData(id)
    });
}

export function createTicketData(id: number) {
    const ticketData = {
        owner: faker.person.fullName(),
        code: faker.string.numeric(),
        eventId: id   
    }
    return ticketData;
}