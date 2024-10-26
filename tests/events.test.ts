import supertest from "supertest";
import app from '../src/app';
import { createNewEvent } from "./factories/event-factory";
import prisma from "database";
import { createNewTicket } from "./factories/ticket-factory";

const api = supertest(app);

describe("GET /events", () => {

    it("should return all events", async () => {

        
        await createNewEvent()
        await createNewEvent()

        const { body } = await api.get('/events');

        expect(body).toHaveLength(2);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    date: expect.any(String),
                })
            ])
        )

        await prisma.ticket.deleteMany();
        await prisma.event.deleteMany()
        
    })
})


