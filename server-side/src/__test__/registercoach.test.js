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

describe('Register TEST Coach ', () => {
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
        test('Register should be ok', async () => {
            const coach = new Coach({
                firstName: "test",
                lastName: "test",
                email: "coachtest@gmail.com",
                password: "123456",
                dob: new Date(),
            })
            coachdata = await coach.save();
            const data = {                
                firstName:"Ahmed",
                lastName:"Boujelben",
                dob:"2002-12-10",
                email:"testtest@gmail.com",
                password:"12345678"
            }
            const response = await request(server).post("/coach/signup")
            
                .send(data)
                expect(response.body.firstName).toBeTruthy()
                expect(response.body.lastName).toBeTruthy()
                expect(response.body.dob).toBeTruthy()
                expect(response.body.email).toBeTruthy()
                
        });
    
    
    })
