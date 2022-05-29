
const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Competence } = require("../models/competence");

let server;
beforeEach(() => {
    server = require("../index");
});

describe('Competence Test', () => {
    jest.setTimeout(10000);
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
        })
    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close()
        await server.close();
    })

    test('should return all Competnece', async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server).get("/competence/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
    });

    test("should return 401 if client is not logged in", async () => {
        const response = await request(server).get("/competence/coach")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });

    test("should save Competence object into the db", async () => {
        const token = await new Coach().generateJWT()

        const response = await request(server).post("/competence/coach").set("x-auth-token", token)
            .send({
                title: "Competence test",
                description: "description competence test",
                link: "http://localhost:8080",
                stars: 4,
                isVisible: false
            });
        const compentence = await Competence.findOne({ title: "Competence test" });
        expect(response.status).toBe(200);
        expect(compentence).not.toBeNull();
    });

    test("should return 400 if http request body is invalid", async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server)
            .post("/competence/coach")
            .set("x-auth-token", token)
            .send({
                title: "Competence test",
                description: "description competence test",
                link: "http://localhost:8080",
                stars: 10,
                isVisible: false
            });
        expect(response.status).toBe(404);
        expect(response.text).toBe("THE COMPETENCE CANNOT BE CREATED");
    })
    test("should return 400 if request param is invalid id", async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server)
            .put("/competence/coach/9999")
            .set("x-auth-token", token)
            .send({
                title: "Competence test 2",
            });

        expect(response.status).toBe(400);
        expect(response.text).toContain("COMPETENCE CANNOT BE UPDATED");
    });

    test("should return the modified valid genre", async () => {
        const token = await new Coach().generateJWT()
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj@gmail.com",
            password: "123456",
            dob: new Date(),
        })
        await coach.save();
        const compentence = new Competence({
            title: "Competence test",
            description: "description competence test",
            link: "http://localhost:8080",
            stars: 4,
            isVisible: false,
            coach: coach.id,
        });
        await compentence.save();
        const response = await request(server)
            .put(`/competence/coach/${compentence._id}`)
            .set("x-auth-token", token)
            .send({ title: "Competence test 1" });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: "Competence test 1",
            description: "description competence test",
            link: "http://localhost:8080",
            stars: 4,
            isVisible: false,
            coach: coach.id,
        });
    });
});

