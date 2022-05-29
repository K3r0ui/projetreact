const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Joueur } = require("../models/joueur");
const { Invitation } = require("../models/invitation");


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


    test("should return 401 if client is not logged in", async () => {
        const response = await request(server).post("/inviter")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });

    test('should return 400 if token is invalid', async () => {
        const response = await request(server).post("/inviter").set("x-auth-token", "XXXX")
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid token");
    });

    test('should return 400 if insufficient subscription', async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "free",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();
        const token = await coach.generateJWT()
        const response = await request(server).post("/inviter").set("x-auth-token", token)
        expect(response.status).toBe(400);
        expect(response.text).toBe("check abonnement");
    });


    test('should return 400 if Joueur already exist', async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj11@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "premium",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();
        const token = await coach.generateJWT()


        const joueur = new Joueur({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj11@gmail.com",
            dob: "25/12/1998",
            pob: "Djerba",
            coach: coach.id,
            sexe: "Homme",
            job: "Etudiant",
            ville: "Djerba",
            telephone: "26414723",
            price: 20,
            taille: 50,
            poid: 80,
            orientation: "droitier",
            nbscweek: 2,
        })
        await joueur.save();
        const response = await request(server).post("/inviter").set("x-auth-token", token).send({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj11@gmail.com",
            dob: "25/12/1998",
            pob: "Djerba",
            coach: coach.id,
            sexe: "Homme",
            job: "Etudiant",
            ville: "Djerba",
            telephone: "26414723",
            price: 20,
            taille: 50,
            poid: 80,
            orientation: "droitier",
            nbscweek: 2,
        })
        expect(response.status).toBe(400);
        expect(response.text).toBe("error to inviter");
    });



    test("should save Joueur && Invitation objects into the db", async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "coach@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "premium",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();
        const token = await coach.generateJWT()
        const response = await request(server).post("/inviter").set("x-auth-token", token)
            .send({
                firstName: "najib",
                lastName: "belhadj",
                email: "najibbelhadj@gmail.com",
                dob: "25/12/1998",
                pob: "Djerba",
                coach: coach.id,
                sexe: "Homme",
                job: "Etudiant",
                ville: "Djerba",
                telephone: "26414723",
                price: 20,
                taille: 50,
                poid: 80,
                orientation: "droitier",
                nbscweek: 2,
            });
        const joueur = await Joueur.findOne({ email: "najibbelhadj@gmail.com" });
        const invitation = await Invitation.findOne({ joueur: joueur._id })
        expect(response.status).toBe(200);
        expect(joueur).not.toBeNull();
        expect(invitation).not.toBeNull();
    });

});

