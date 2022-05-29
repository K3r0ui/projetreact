const { Coach } = require("../models/coach");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Program } = require("../models/program");

let server;
beforeEach(() => {
  server = require("../index");
});

describe("Competence Test", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
    });
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await server.close();
  });

  test("should return all Program", async () => {
    const token = await new Coach().generateJWT();
    const response = await request(server)
      .get("/program/coach")
      .set("x-auth-token", token);
    expect(response.status).toBe(200);
  });

  test("should return 400 if token is invalid", async () => {
    const response = await request(server)
      .get("/program/coach")
      .set("x-auth-token", "XXXX");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid token");
  });

  test("should return 403 if client is not logged in", async () => {
    const response = await request(server).get("/program/coach");
    expect(response.status).toBe(403);
    expect(response.text).toBe("Access denied.");
  });

  test("should save Program object into the db", async () => {
    const token = await new Coach().generateJWT();
    const response = await request(server)
      .post("/program/coach")
      .set("x-auth-token", token)
      .send({
        name: "Program test",
        description: "Program Description Test",
        image: "http://image.test.com",
        videoLink: "http://localhost:8080/",
      });
    const program = await Program.findOne({ name: "Program test" });
    expect(response.status).toBe(200);
    expect(program).not.toBeNull();
  });

  test("should return 500 if request param is invalid id", async () => {
    const token = await new Coach().generateJWT();
    const response = await request(server)
      .put("/program/coach/9999")
      .set("x-auth-token", token)
      .send({
        name: "Program test 2",
      });

    expect(response.status).toBe(500);
    expect(response.text).toContain("something wrong happened!");
  });

  test("should return the modified valid Program", async () => {
    const token = await new Coach().generateJWT();
    const coach = new Coach({
      firstName: "najib",
      lastName: "belhadj",
      email: "najibbelhadj@gmail.com",
      password: "123456",
      dob: new Date(),
    });
    await coach.save();
    const program = new Program({
      name: "Program test",
      description: "Program Description Test",
      image: "http://image.test.com",
      videoLink: "http://localhost:8080/",
      coach: coach.id,
    });
    await program.save();
    const response = await request(server)
      .put(`/program/coach/${program._id}`)
      .set("x-auth-token", token)
      .send({ name: "Program test 1" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: "Program test 1",
      description: "Program Description Test",
      image: "http://image.test.com",
      videoLink: "http://localhost:8080/",
      coach: coach.id,
    });
  });

  test("should respond to DELETE requests", async () => {
    const token = await new Coach().generateJWT();
    const coach = new Coach({
      firstName: "najib",
      lastName: "belhadj",
      email: "najibbelhadj11@gmail.com",
      password: "123456",
      dob: new Date(),
    });
    await coach.save();
    const program = new Program({
      name: "Program test",
      description: "Program Description Test",
      image: "http://image.test.com",
      videoLink: "http://localhost:8080/",
      coach: coach.id,
    });
    await program.save();

    const response = await request(server)
      .delete(`/program/coach/${program._id}`)
      .set("x-auth-token", token);

    expect(response.status).toBe(200);
  });
});
