const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Stat } = require("../models/stat");

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

    test('should return all Competnece', async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server).get("/stat/coach").set("x-auth-token", token)
        expect(response.status).toBe(200);
    });

    test("should return 401 if client is not logged in", async () => {
        const response = await request(server).get("/stat/coach")
        expect(response.status).toBe(403);
        expect(response.text).toBe("Access denied.");
    });

    test('should return 400 if token is invalid', async () => {
        const response = await request(server).get("/stat/coach").set("x-auth-token", "XXXX")
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid token");
    });

    test("should save Statistique object into the db", async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server).post("/stat/coach").set("x-auth-token", token)
            .send({
                title: "Statistique test title",
                description: "Statistique test description",
                type: "Statistique test type",
                unite: "Statistique testunite",
                lien: "Statistique test lien",
                max: "maximiser",
                isVisible: true,
                alert: true,

            });
        const statistique = await Stat.findOne({ title: "Statistique test title" });
        expect(response.status).toBe(200);
        expect(statistique).not.toBeNull();
    });

    test("should return 500 if request param is invalid id", async () => {
        const token = await new Coach().generateJWT()
        const response = await request(server)
            .get("/stat/9999")
            .set("x-auth-token", token)
            .send({
                title: "Statistique test 2",
            });

        expect(response.status).toBe(500);
        expect(response.text).toContain("Id not Found");
    });

    it("should return specific Stat of passed id", async () => {
        const token = await new Coach().generateJWT()
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj12@gmail.com",
            password: "123456",
            dob: new Date(),
        })
        await coach.save();
        const statistique = new Stat({
            title: "Statistique test title",
            description: "Statistique test description",
            type: "Statistique test type",
            unite: "Statistique testunite",
            lien: "Statistique test lien",
            max: "maximiser",
            isVisible: true,
            alert: true,
            coach: coach._id
        });
        await statistique.save();
        const response = await request(server).get(`/stat/${statistique._id}`).set("x-auth-token", token)
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: "Statistique test title",
            description: "Statistique test description",
            type: "Statistique test type",
            unite: "Statistique testunite",
            lien: "Statistique test lien",
            max: "maximiser",
            isVisible: true,
            alert: true,
            coach: coach._id
        });
    });


    test("should return the modified valid Statistique", async () => {
        const token = await new Coach().generateJWT()
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj13@gmail.com",
            password: "123456",
            dob: new Date(),
        })
        await coach.save();
        const statistique = new Stat({
            title: "Statistique test title",
            description: "Statistique test description",
            type: "Statistique test type",
            unite: "Statistique testunite",
            lien: "Statistique test lien",
            max: "maximiser",
            isVisible: true,
            alert: true,
            coach: coach._id
        });
        await statistique.save();
        const response = await request(server)
            .put(`/stat/coach/${statistique._id}`)
            .set("x-auth-token", token)
            .send({ title: "Statistique test title 1" });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: "Statistique test title 1",
            description: "Statistique test description",
            type: "Statistique test type",
            unite: "Statistique testunite",
            lien: "Statistique test lien",
            max: "maximiser",
            isVisible: true,
            alert: true,
            coach: coach._id
        });
    });


    test("should not respond to DELETE requests", async () => {
        const token = await new Coach().generateJWT()
        const coach = new Coach({
            firstName: "najib",
            lastName: "belhadj",
            email: "najibbelhadj@gmail.com",
            password: "123456",
            dob: new Date(),
        })
        await coach.save();

        const statistique = new Stat({
            title: "Statistique test title",
            description: "Statistique test description",
            type: "Statistique test type",
            unite: "Statistique testunite",
            lien: "Statistique test lien",
            max: "maximiser",
            isVisible: true,
            alert: true,
            coach: coach._id
        });
        await statistique.save();

        const response = await request(server)
            .delete(`/stat/coach/${statistique._id}`)
            .set("x-auth-token", token);

        expect(response.status).toBe(200);
    });


});

