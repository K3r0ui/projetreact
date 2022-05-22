const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const { Defi } = require("../models/defi");
let server;
let token;
let defi;
beforeEach(async() => {
    server = require("../index");
   
   
});
describe('defis test', () => {
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
    test('should return all Defis (empty defis)', async () => {
        
        const response = await request(server).get("/defi/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(0)
    });
  
    test("should save defi object into the db", async () => {
        const data={
               
            description: "description defi test",
            link: "http://localhost:8080",
           
        }
        const response = await request(server).post("/defi/coach").set("x-auth-token", token)
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
        expect(response.body.description).toBe(data.description);
        expect(response.body.link).toBe(data.link);
        defi=response.body;

    });
    test('should return all Defis (not empty defis)', async () => {
        const response = await request(server).get("/defi/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
    });

    test('should return 400 status', async () => {
        const token = "56"
        const response = await request(server).get("/defi/coach").set("x-auth-token", token)
        expect(response.status).toBe(400);
       
    });

    test("should return 401 if client is not logged in", async () => {
        const response = await request(server).get("/defi/coach")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });
    test('should update defi', async () => {
        const data={
               
            description: "description defi test update",
            link: "http://localhost:8080/update",
          
           
        }
        const response = await request(server).put("/defi/coach/"+defi._id).set("x-auth-token", token)
                              .send(data);
        expect(response.status).toBe(200); 
        expect(response.body._id).toBeTruthy()
        expect(response.body.description).toBe(data.description);
        expect(response.body.link).toBe(data.link);
        defi=response.body;

        
    });

    test("should deleteatask using its id",async()=>{
        const response = await request(server)
          .delete("/defi/coach/"+defi._id)
          .set("x-auth-token", token)
          .expect(200)
          .then(async()=>{
            expect(
              await Defi.findOne({id:defi._id})
            ).toBeFalsy()
          })
      })


    
});