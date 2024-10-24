import prisma from "database";
import { faker } from "@faker-js/faker"

export async function createNewEvent() {
    return await prisma.event.create({
        data: {
            name: `${faker.music.genre()} show`,
            date: faker.date.future({ years: 3 })
    }});
}