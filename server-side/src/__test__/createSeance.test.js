const { Coach } = require("../models/coach");
const { Joueur } = require("../models/joueur");
const { Seance } = require("../models/seance");
const { Program } = require("../models/program");
const { Lieu } = require("../models/lieu");
const { Stat } = require("../models/stat");
const { Competence } = require("../models/competence");


const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let server;
let token;
let coach;
let lieux ; 
let joueur;
let program;
let compentence;
let stat;

beforeEach(async() => {
    server = require("../index");
   
   
});
describe(' seance test create and affiche', () => {
    jest.setTimeout(10000);
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            
        })

           coach = new Coach({
            firstName: "test",
            lastName: "test",
            email: "test@gmail.com",
            password: "123456",
            dob: new Date(),
        });
          coach = await coach.save();
          token = await coach.generateJWT();

         joueur = new Joueur({
            firstName:"Achref",
            lastName:"Hamrouni",
            email: "joueur@gmail.com",
            coach:coach._id,
            password:"123456",

            
        }); 
        joueur = await joueur.save();
        lieux = new Lieu({
            name: "nabel",
            city: "zzh5",
            country: "Tunis",
            address: "Tunis",
            coach: coach._id
        });
        await lieux.save()


        
         program = new Program({
            name: "Program test",
            description: "Program Description Test",
            image: "http://image.test.com",
            videoLink: "http://localhost:8080/",
        })
        program.save()
        compentence=new Competence({
            title: "Competence test",
            description: "description competence test",
            link: "http://localhost:8080",
            stars: 4,
            isVisible: false

        })
        await compentence.save();
        stat = new Stat({
            title: "Statistique test title",
            description: "Statistique test description",
            type: "Statistique test type",
            unite: "Statistique test unite",
            lien: "Statistique test lien",
            max: "maximiser",
            isVisible: true,
            alert: true,

        })
        await stat.save();
        
        
       


      

    })
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close()
        await server.close();
    })


    test('should return all seances (empty seance )', async () => {
        
        const response = await request(server).get("/coach/seance/").set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(0)
    });
    test("should return 403 stauts (token) ", async () => {
        const data={
               
            titre: "test titre"
       
           
        }
        const response = await request(server).post("/coach/seance")
                                             .send(data);

        expect(response.status).toBe(403);
        

     
        

    });
    test("should save seance object into the db", async () => {
        const data={
               
            titre: "test titre",
            date: new Date(),
            lieu: lieux._id,
            joueur: joueur._id,
            program: program._id,
            competences:[compentence._id],
            "statistiques":[
                {
                    "statistique":stat._id,
                    "valeur":"455"
                },
                
    ]
    
           
        }
        const response = await request(server).post("/coach/seance").set("x-auth-token", token)
                                             .send(data);

        expect(response.status).toBe(200);
        expect(response.body._id).toBeTruthy()
       /expect(response.body).toMatchObject({
            titre: "test titre",
            etat: "en cours",
            coach: coach._id,
            lieu: lieux._id,
            joueur: joueur._id,
            program: program._id,
            competences:[compentence._id],
            "statistiques":[
                {
                    "statistique":stat._id,
                    "valeur":"455"
                },
                
    ]
        });
        

    });
    test('should return all Events (not empty seanxe)', async () => {
        const response = await request(server).get("/coach/seance/").set("x-auth-token", token)
        expect(response.status).toBe(200);

        
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        
    });

    
    

 



 


    
});