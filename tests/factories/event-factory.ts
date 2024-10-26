import prisma from "database";
import { faker } from "@faker-js/faker"
import { Event } from "@prisma/client";

export async function createNewEvent() {
    let eventName: string;
    let eventExists: Event;

    do {
        eventName = `${faker.music.genre()} show`;
        eventExists = await prisma.event.findUnique({
            where: {
                name: eventName,
            },
        });
    } while (eventExists);

    const eventCreated = await prisma.event.create({
        data: {
            name: eventName,
            date: faker.date.future({ years: 3 }),
        },
    });

    return eventCreated;
}