const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
import bcrypt from "bcryptjs";
const { Joueur } = require("../models/joueur");



let server;
beforeEach(() => {
    server = require("../index");
});

describe('Aficher et modifier Seance Test ', () => {
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

    test('should return Profile', async () => {
        const token = await new Joueur().generateJWT()
        const response = await request(server).get("/joueur/profile").set("x-auth-token", token)
        expect(response.status).toBe(200);
    });

    test("should return 401 if client is not logged in", async () => {
        const response = await request(server).get("/joueur/profile")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });

    test('should return 400 if token is invalid', async () => {
        const response = await request(server).get("/joueur/profile").set("x-auth-token", "XXXX")
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid token");
    });


    test('should Modify Profile', async () => {
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
        const token = await joueur.generateJWT()
        const response = await request(server).put("/joueur/modifierprofile").set("x-auth-token", token)
            .send({
                firstName: "Test",
                lastName: "test",
            })
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            firstName: "Test",
            lastName: "test",
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
        });

    });



    test('should Modify Password', async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj13@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "premium",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();
        const joueur = new Joueur({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj13@gmail.com",
            password: bcrypt.hashSync("12345678", 8),
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
        const token = await joueur.generateJWT()
        const response = await request(server).put("/joueur/modifierpassword").set("x-auth-token", token)
            .send({
                oldPassword: "12345678",
                newPassword: "87654321"
            })
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj13@gmail.com",
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

    });



    test('should return 400 if oldPassword is invalid', async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj14@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "premium",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();
        const joueur = new Joueur({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj14@gmail.com",
            password: bcrypt.hashSync("12345678", 8),
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
        const token = await joueur.generateJWT()
        const response = await request(server).put("/joueur/modifierpassword").set("x-auth-token", token)
            .send({
                oldPassword: "20325648",
                newPassword: "87654321"
            })
        expect(response.status).toBe(400);
        expect(response.text).toBe("Verifier votre password");

    });


});

