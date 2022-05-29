const { Coach } = require("../models/coach");
const { Joueur } = require("../models/joueur");
const { Defi } = require("../models/defi");


const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
let token
let server;
let defi;
let tokenJ;
beforeEach(async() => {
    server = require("../index");


});
describe('defi done', () => {
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
            firstName:"Amine",
            lastName:"Karoui",
            email: "aminekaroui@gmail.com",
            coach:coach._id,
            password:"123456",


        }); 
        joueur = await joueur.save();
        tokenJ = await joueur.generateJWT(); 


        defi=new Defi({
            coach:coach._id,
            name: "nametest",
            description: "description defi test",
            etat:"public"

        })
        defi = await defi.save();





    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close()
        await server.close();
    })

    test('should return Defi CANNOT BE UPDATED ', async () => {
        const data={

            donejoueur:true


        }



        const response = await request(server).put("/defi/joueur/jdhdhgfg").set("x-auth-token", tokenJ)
                                              .send(data);
        expect(response.status).toBe(404);
        expect(response.text).toContain("Defi CANNOT BE UPDATED");

  ;


    });



    test('should  be done', async () => {
        const data={

            donejoueur:true


        }
        const response = await request(server).put("/defi/joueur/"+defi._id).set("x-auth-token", tokenJ)
                                              .send(data);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
        expect(response.body.name).toBe(defi.name)
        expect(response.body.description).toBe(defi.description)

     ;

        defi=response.body;

    });













}); 