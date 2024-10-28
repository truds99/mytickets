import prisma from "database";
import { faker } from "@faker-js/faker"
import { Event } from "@prisma/client";

export async function createNewEvent() {

    const eventData = await createEventData();
    
    const eventCreated = await prisma.event.create({
        data: eventData,
    });

    return eventCreated;
}

export async function createExpiredEvent() {

    const eventData = await createEventData();
    
    eventData.date = faker.date.past();

    const eventCreated = await prisma.event.create({
        data: eventData,
    });

    return eventCreated;
}

export async function createEventData() {

    const eventName = await createNewEventName();

    const eventData = {
        name: eventName,
        date: faker.date.future({ years: 3 })
    }
    return eventData;
}

export async function createNewEventName() {
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

    return eventName;
}