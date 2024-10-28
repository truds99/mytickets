import supertest from "supertest";
import app from '../src/app';
import prisma from "database";
import { createExpiredEvent, createNewEvent } from "./factories/event-factory";
import { createNewTicket, createTicketData } from "./factories/ticket-factory";

const api = supertest(app);

describe("POST /tickets", () => {

    it("should create a new ticket", async () => {
        const { id } = await createNewEvent();
        const ticketData = await createTicketData(id);

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
    });

    it("shouldn't create a ticket because event is expired", async () => {
        const { id } = await createExpiredEvent();
        const ticketData = await createTicketData(id);

        const { status } = await api.post(`/tickets`).send(ticketData);

        expect(status).toBe(403);

    });

    it("shouldn't create a ticket because data is invalid", async () => {
        const { id } = await createNewEvent();
        const ticketData = 'ticket';

        const { status } = await api.post(`/tickets`).send(ticketData);

        expect(status).toBe(422);

    });

    it("shouldn't create a ticket because code is already registered", async () => {
        const { id } = await createNewEvent();
        const ticketData = await createTicketData(id);

        await api.post(`/tickets`).send(ticketData);

        const secondTicket = ticketData;

        const { status } = await api.post(`/tickets`).send(secondTicket);

        expect(status).toBe(409);

    });

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

    it("shouldn't return tickets because parameter is invalid", async () => {
        const { id } = await createNewEvent();
        await createNewTicket(id);

        const { status } = await api.get(`/tickets/ticket`);

        expect(status).toBe(400);
    })

})

describe("PUT /tickets", () => {

    it("should updated a ticket to used", async () => {

        const { id } = await createNewEvent();
        const ticketData = await createNewTicket(id);

        const { status } = await api.put(`/tickets/use/${ticketData.id}`);

        const ticketUpdated = await verifyIfTicketWasUptated(ticketData.id);
        expect(status).toBe(204);
        expect(ticketUpdated).toBe(true);

    })

    it("shouldn't updated a ticket because event is expired", async () => {

        const { id } = await createExpiredEvent();
        const ticketData = await createNewTicket(id);

        const { status } = await api.put(`/tickets/use/${ticketData.id}`);

        expect(status).toBe(403);
    
    })

    it("shouldn't updated a ticket because ticket was not found", async () => {

        const { id } = await createExpiredEvent();
        const ticketData = await createNewTicket(id);

        ticketData.id ++;

        const { status } = await api.put(`/tickets/use/${ticketData.id}`);

        expect(status).toBe(404);
    
    })
})



async function verifyIfTicketWasUptated(id: number) {
    const ticketUpdated = await prisma.ticket.findUnique({
        where: {
            id,
            used: true
        }
    });
    return (!!ticketUpdated);
}




