import supertest from "supertest";
import app from '../src/app';
import prisma from "database";
import { createNewEvent } from "./factories/event-factory";
import { createNewTicket, createTicketData } from "./factories/ticket-factory";

const api = supertest(app);

beforeEach(async () => {
    await prisma.event.deleteMany();
    await prisma.ticket.deleteMany();
})

describe("POST /tickets", () => {

    it("should create a new ticket", async () => {

        const { id } = await createNewEvent();
        const ticketData = createTicketData(id);

        const { status, body } = await api.post(`/tickets`).send(ticketData);

        expect(status).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                owner: expect.any(String),
                code: expect.any(String),
                used: expect.any(Boolean),
                eventId: expect.any(Number)
            })
        );

    })
})

describe("GET /tickets/:eventId", () => {

    it("should return tickets of a specific event", async () => {

        const { id } = await createNewEvent();
        await createNewTicket(id);

        const { body } = await api.get(`/tickets/${id}`);

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number), 
                    owner: expect.any(String),
                    code: expect.any(String),
                    used: expect.any(Boolean),
                    eventId: expect.any(Number)
                })
            ])
        )
        
    })
})
