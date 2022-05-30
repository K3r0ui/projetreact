const { Coach } = require("../models/coach");
import { Lieu } from './../models/lieu';
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
let server;
let token;
let lieu;
beforeEach(async () => {
    server = require("../index");


});
describe('Tous les tests pour LIEUX', () => {
    jest.setTimeout(10000);
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,

        })

        let coach = new Coach({
            firstName: "lieutesting",
            lastName: "lieutesting",
            email: "lieutesting@gmail.com",
            password: "123456",
            dob: new Date(),
        });
        coach = await coach.save();
        token = await coach.generateJWT();
    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close()
        await server.close();
    })


    test("Should be inserted to the database", async () => {
        const data = {

            name: "StepOneRoom",
            city: "La Manouba",
            country: "Tunisia",
            address: "Lac 2"

        }
        const response = await request(server).post("/lieu/coach").set("x-auth-token", token)
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
        expect(response.body.name).toBe(data.name);
        expect(response.body.city).toBe(data.city);
        expect(response.body.country).toBe(data.country);
        expect(response.body.address).toBe(data.address);
        lieu = response.body;

    });
    test('Should Return Empty Locations', async () => {

        const response = await request(server).get("/lieu/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()

    });
    test('Should not return empty locations', async () => {
        const response = await request(server).get("/lieu/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
    });

    test('Wrong Token , Should Return 400 Status', async () => {
        const token = "ABRFEFFER"
        const response = await request(server).get("/lieu/coach").set("x-auth-token", token)
        expect(response.status).toBe(400);

    });

    test("User is not logged in , Should return 403 Status", async () => {
        const response = await request(server).get("/lieu/coach")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });
    test('Should Update the location', async () => {
        const data = {

            name: "Location Update",
            city: "Manouba Update",
            country: "Tunisia",
            address: "Lac2 Update",


        }
        const response = await request(server).put("/lieu/coach/" + lieu._id).set("x-auth-token", token)
            .send(data);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
        expect(response.body.name).toBe(data.name);
        expect(response.body.city).toBe(data.city);
        expect(response.body.country).toBe(data.country);
        expect(response.body.address).toBe(data.address);
        lieu = response.body;


    });

    test("Should delete Location by ID", async () => {
        const response = await request(server)
            .delete("/lieu/coach/" + lieu._id)
            .set("x-auth-token", token)
            .expect(200)
            .then(async () => {
                expect(
                    await Lieu.findOne({ id: lieu._id })
                ).toBeFalsy()
            })
    })



});