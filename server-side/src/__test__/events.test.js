const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const { Event } = require("../models/event");
let server;
let token;
let event;
beforeEach(async() => {
    server = require("../index");
   
   
});
describe('events test', () => {
    jest.setTimeout(10000);
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            
        })

        let coach = new Coach({
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com",
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
    test('should return all events (empty events )', async () => {
        
        const response = await request(server).get("/event/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(0)
    });
  
    test("should save defi object into the db", async () => {
        const data={
               
            name: "name evest  test",
            description: "description event test",
            etat:"prive"
           
        }
        const response = await request(server).post("/event/coach").set("x-auth-token", token)
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
        expect(response.body.name).toBe(data.name);
        expect(response.body.description).toBe(data.description);
        event=response.body;

    });
    test('should return all Events (not empty event)', async () => {
        const response = await request(server).get("/event/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);

        
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        
    });

    test('should return 400 status', async () => {
        const token = "sds4d5s65ds"
        const response = await request(server).get("/event/coach").set("x-auth-token", token)
        expect(response.status).toBe(400);
       
    });

    test("should return 401 if client is not logged in", async () => {
        const response = await request(server).get("/event/coach")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });
    test('should update event', async () => {
        const data={
               
            name: "name evest  test update",
            description: "description event test update",
            etat:"en cours"
          
           
        }
        const response = await request(server).put("/event/coach/"+event._id).set("x-auth-token", token)
                              .send(data);
        expect(response.status).toBe(200); 
        expect(response.body._id).toBeTruthy()
        expect(response.body.name).toBe(data.name);
        expect(response.body.description).toBe(data.description);

        event=response.body;

        
    });

    test("should deleteatask using its id",async()=>{
        const response = await request(server)
          .delete("/event/coach/"+event._id)
          .set("x-auth-token", token)
          .expect(200)
          .then(async()=>{
            expect(
              await Event.findOne({id:event._id})
            ).toBeFalsy()
          })
      })


    
});