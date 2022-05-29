const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
let server;
let token;
let coachdata;
beforeEach(() => {
    server = require("../index");
});

describe('Login TEST Coach ', () => {
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
        test('cannot login with empty email', async () => {
            const response = await request(server).post("/coach/login")

                .send({

                    password: "123456",
                })
                expect(response.status).toBe(400);
                expect(response.text).toBe("Email or Password invalid.");

        });
        test('cannot login with empty password', async () => {
            const response = await request(server).post("/coach/login")

                .send({
                    email: "coachtest@gmail.com",
                })
                expect(response.status).toBe(400);
                expect(response.text).toBe("Email or Password invalid.");

        });
        test('cannot login with invalid password', async () => {
            const response = await request(server).post("/coach/login")

                .send({
                    password: "12345678",
                })
                expect(response.status).toBe(400);
                expect(response.text).toBe("Email or Password invalid.");

        });
        test('cannot login with invalid email', async () => {
            const response = await request(server).post("/coach/login")

                .send({
                    email: "coachtes12t@gmail.com",
                })
                expect(response.status).toBe(400);
                expect(response.text).toBe("Email or Password invalid.");

        });
        test('Login', async () => {
            const coach = new Coach({
                firstName: "test",
                lastName: "test",
                email: "coachtest@gmail.com",
                password: "123456",
                dob: new Date(),
            })
            coachdata = await coach.save();
            const response = await request(server).post("/coach/login")

                .send({
                    email: "coachtest@gmail.com",
                    password: "123456",
                })
                expect(response.body.coach.email).toBe(coachdata.email);
                expect(response.body.coach.firstName).toBe(coachdata.firstName);
                expect(response.body.coach.lastName).toBe(coachdata.lastName);

        });


    })