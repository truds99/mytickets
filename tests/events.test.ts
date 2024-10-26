import supertest from "supertest";
import app from '../src/app';
import { createEventData, createNewEvent } from "./factories/event-factory";

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
        );
        
    })
})

describe("GET /events/:id", () => {

    it("should return an specific event", async () => {

        const { id } = await createNewEvent();

        const { body } = await api.get(`/events/${id}`);

        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
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


