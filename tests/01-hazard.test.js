import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let hazardId;
export let anotherHazardId;

describe("Hazards", () => {
  it("should reject non-string streetNumber", async () => {
    const res = await chai
    .request(app)
    .post("/api/v1/hazards")
    .send({
      streetName: "Main St",
      streetNumber: 123,
      city: "Auckland",
      region: "Auk",
      type: "Fire",
      description: "Severe fire hazard",
    });

    chai
    .expect(res.body.message).to.be.equal("streetNumber should be a string");
  });

  it("should create a valid hazard record", async () => {
    const res = await chai.request(app).post("/api/v1/hazards").send({
      streetNumber: "123",
      streetName: "Main St",
      city: "Auckland",
      region: "Auk",
      type: "Fire",
      description: "A large fire broke out in a commercial building.",
    });

    chai
    .expect(res.body.message)
    .to.be.equal("Hazard successfully created");
    hazardId = res.body.data[0].id;
  });

  it("should create another valid hazard record", async () => {
    const res = await chai.request(app).post("/api/v1/hazards").send({
      streetNumber: "456",
      streetName: "Broadway",
      city: "Waikato",
      region: "Waikato",
      type: "Flood",
      description: "Flood in the main shopping area.",
    });

    chai
    .expect(res.body.message)
    .to.be.equal("Hazard successfully created");
    anotherHazardId = res.body.data[0].id;
  });

  it("should retrieve all hazard records", async () => {
    const res = await chai.request(app).get("/api/v1/hazards");

    chai.expect(res.body.data).to.be.an("array");
  });

  it("should retrieve a hazard record by ID", async () => {
    const res = await chai
    .request(app)
    .get(`/api/v1/hazards/${hazardId}`);

    chai.expect(res.body.data.id).to.be.equal(hazardId);
  });

  it("should filter hazard records by streetName", async () => {
    const res = await chai.request(app).get("/api/v1/hazards?streetName=Main St");

    chai
    .expect(res.body.data[0].streetName)
    .to.be.equal("Main St");
  });

  it("should reject non-string type during update", async () => {
    const res = await chai.request(app).put(`/api/v1/hazards/${hazardId}`).send({
      streetNumber: "123",
      streetName: "Main St",
      city: "Auckland",
      region: "Auk",
      type: 123,
      description: "Updated description after hazard assessment.",
    });

    chai
    .expect(res.body.message)
    .to.be.equal("type should be a string");
  });

  it("should update a valid hazard record", async () => {
    const res = await chai.request(app).put(`/api/v1/hazards/${hazardId}`).send({
      streetNumber: "123",
      streetName: "Main St",
      city: "Auckland",
      region: "Auk",
      type: "Earthquake",
      description: "An earthquake caused significant damage.",
    });

    chai
    .expect(res.body.message)
    .to.be.equal(`Hazard record with the id: ${hazardId} successfully updated`);
  });

  it("should delete a hazard record by ID", async () => {
    const res = await chai
    .request(app)
    .delete(`/api/v1/hazards/${hazardId}`);

    chai
    .expect(res.body.message)
    .to.be.equal(`Hazard record with the id: ${hazardId} successfully deleted`

    );
  });
});
