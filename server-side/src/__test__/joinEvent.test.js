const { Coach } = require("../models/coach");
const { Joueur } = require("../models/joueur");

const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const { Event } = require("../models/event");
let server;
let token;
let event;
let privateEvent;
let tokenJ;
beforeEach(async() => {
    server = require("../index");
   
   
});
describe('join events test', () => {
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

        let joueur = new Joueur({
            firstName:"Achref",
            lastName:"Hamrouni",
            email: "joueur@gmail.com",
            coach:coach._id,
            password:"123456",

            
        }); 
        joueur = await joueur.save();
        tokenJ = await joueur.generateJWT(); 
        
        
        event=new Event({
            coach:coach._id,
            name: "name evest  test",
            description: "description event test",
            etat:"public"

        })
        event = await event.save();



        privateEvent=new Event({
            coach:coach._id,
            name: "name private event  test",
            description: "private description event test",
            etat:"privé"

        })
        privateEvent = await privateEvent.save();

    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close()
        await server.close();
    })

    test('should return invalid id ', async () => {
        const data={
               
            status:"participer"
          
           
        }


        
        const response = await request(server).put("/event/joueur/join/bnsdbnbds").set("x-auth-token", tokenJ)
                                              .send(data);
        expect(response.status).toBe(400);
        expect(response.text).toContain("Invalid EventId");

  ;


    });


    test('should return status Error ', async () => {
        const data={
               
            status:"fakeStatus"
          
           
        }


        
        const response = await request(server).put("/event/joueur/join/"+event._id)
                                              .set("x-auth-token", tokenJ)
                                              .send(data);
        expect(response.status).toBe(200);
        expect(response.text).toContain("status Error");

  ;


    });



    test('should join event', async () => {
        const data={
               
            status:"participer"
          
           
        }
        
        const response = await request(server).put("/event/joueur/join/"+event._id).set("x-auth-token", tokenJ)
                                              .send(data);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
        expect(response.body.name).toBe(event.name);
        expect(response.body.description).toBe(event.description);

        event=response.body;

    });


    test('should return you are ready join this event ', async () => {
        const data={
               
            status:"participer"
          
           
        }
        
        const response = await request(server).put("/event/joueur/join/"+event._id).set("x-auth-token", tokenJ)
                                              .send(data);
        expect(response.status).toBe(200);
        expect(response.text).toContain("you are ready join this event");
     
        

        event=response.body;

    });


  

 



 


    
});