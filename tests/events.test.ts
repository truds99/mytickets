import supertest from "supertest";
import app from '../src/app';
import { createEventData, createNewEvent, createNewEventName } from "./factories/event-factory";
import { faker } from "@faker-js/faker/.";
import prisma from "database";

const api = supertest(app);

describe("GET /events", () => {

    it("should return all events", async () => {

        await createNewEvent();
        await createNewEvent();

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
        );
        
    })
})

describe("GET /events/:id", () => {

    it("should return an specific event", async () => {
        const { id } = await createNewEvent();

        const { body } = await api.get(`/events/${id}`);

        expect(body).toEqual(
            expect.objectContaining({
                id,
                name: expect.any(String),
                date: expect.any(String),
            })
        );
        
    })
})

describe("POST /events", () => {

    it("should create a new event", async () => {

        const eventData = await createEventData();
        
        const { status, body } = await api.post(`/events`).send(eventData);

        expect(status).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                date: expect.any(String)
            })
        );

    })
})

describe("PUT /events/:id", () => {

    it("should update an event", async () => {

        const { id } = await createNewEvent();
        const newEvent = await createEventData();
        
        const { status, body } = await api.put(`/events/${id}`).send(newEvent);

        expect(status).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                id,
                name: newEvent.name,
                date: newEvent.date.toISOString()
            })
        );

    })
})

describe("DELETE /events/:id", () => {

    it("should update an event", async () => {

        const { id } = await createNewEvent();
        
        const { status } = await api.delete(`/events/${id}`);
        const eventDeleted = await verifyIfEventWasDeleted(id);

        expect(status).toBe(204);
        expect(eventDeleted).toBe(true);

    })
})

async function verifyIfEventWasDeleted(id: number) {
    const eventDeleted = await prisma.ticket.findUnique({
        where: {
            id
        }
    });
    return (!eventDeleted);
}


