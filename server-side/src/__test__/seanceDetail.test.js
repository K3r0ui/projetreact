const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Seance } = require("../models/seance");
const { Program } = require("../models/program");
const { Joueur } = require("../models/joueur");
const { Lieu } = require("../models/lieu");


let server;
beforeEach(() => {
    server = require("../index");
});

describe('Show Seance Detail', () => {
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

    test('should return Seance detail', async () => {
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

        const lieux = new Lieu({
            name: "Djerba",
            city: "Djerba",
            country: "Mednin",
            address: "Hoummet Souk",
            coach: coach._id
        });
        await lieux.save()


        const joueur = new Joueur({
            firstName: "najib",
            lastName: "belhadj",
            email: "joueur@gmail.com",
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


        const program = new Program({
            name: "Program test",
            description: "Program Description Test",
            image: "http://image.test.com",
            videoLink: "http://localhost:8080/",
        })
        program.save()

        let seance = new Seance({
            titre: "seance Test titre",
            date: new Date(),
            etat: "en cours",
            coach: coach._id,
            lieu: lieux._id,
            joueur: joueur._id,
            program: program._id,
        })
        await seance.save();
        const response = await request(server).get(`/coach/seance/${seance._id}`).set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            titre: "seance Test titre",
            etat: "en cours",
            coach: coach._id,
            lieu: lieux._id,
            joueur: joueur._id,
            program: program._id,
        });
    });

    test("should return 401 if client is not logged in", async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj15@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "premium",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();

        const lieux = new Lieu({
            name: "Djerba",
            city: "Djerba",
            country: "Mednin",
            address: "Hoummet Souk",
            coach: coach._id
        });
        await lieux.save()

        const joueur = new Joueur({
            firstName: "najib",
            lastName: "belhadj",
            email: "joueur15@gmail.com",
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


        const program = new Program({
            name: "Program test",
            description: "Program Description Test",
            image: "http://image.test.com",
            videoLink: "http://localhost:8080/",
        })
        program.save()

        const seance = new Seance({
            titre: "seance Test titre",
            date: new Date(),
            etat: "en cours",
            coach: coach._id,
            lieu: lieux._id,
            joueur: joueur._id,
            program: program._id,
        })
        await seance.save()


        const response = await request(server).get(`/coach/seance/${seance._id}`)
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });

    test('should return 400 if token is invalid', async () => {
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj16@gmail.com",
            password: "123456",
            dob: new Date(),
            abonnement: {
                type: "premium",
                doc: new Date(),
                joueurterminer: 7
            },
        })
        await coach.save();
        const lieux = new Lieu({
            name: "Djerba",
            city: "Djerba",
            country: "Mednin",
            address: "Hoummet Souk",
            coach: coach._id
        });
        await lieux.save()

        const joueur = new Joueur({
            firstName: "najib",
            lastName: "belhadj",
            email: "joueur16@gmail.com",
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


        const program = new Program({
            name: "Program test",
            description: "Program Description Test",
            image: "http://image.test.com",
            videoLink: "http://localhost:8080/",
        })
        program.save()

        const seance = new Seance({
            titre: "seance Test titre",
            date: new Date(),
            etat: "en cours",
            coach: coach._id,
            lieu: lieux._id,
            joueur: joueur._id,
            program: program._id,
        })
        await seance.save()

        const response = await request(server).get(`/coach/seance/${seance._id}`).set("x-auth-token", "XXXX")
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid token");
    });


    test("should return 400 if request param is invalid id", async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server)
            .get("/coach/seance/9999")
            .set("x-auth-token", token)

        expect(response.status).toBe(500);
        expect(response.text).toContain("something wrong happened!");
    });

});