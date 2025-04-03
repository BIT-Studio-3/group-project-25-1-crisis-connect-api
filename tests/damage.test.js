import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let damageId;
export let anotherDamageId; // Exported for use in other test files

describe("Damages", () => {
  it("should reject non-string streetNumber", async () => {
    const res = await chai.request(app).post("/api/v1/damage").send({
      streetName: "Main St",
      streetNumber: 123,
      city: "New York",
      region: "NY",
      type: "Fire",
      description: "Severe fire damage",
    });

    chai
      .expect(res.body.message)
      .to.be.equal("streetNumber should be a string");
  });

  it("should create a valid damage record", async () => {
    const res = await chai.request(app).post("/api/v1/damage").send({
      streetNumber: "123",
      streetName: "Main St",
      city: "Springfield",
      region: "Midwest",
      type: "Fire",
      description: "A large fire broke out in a commercial building.",
    });
    chai
      .expect(res.body.message)
      .to.be.equal("Damage successfully recorded");
    damageId = res.body.data[0].id;
  });

  it("should create another valid damage record", async () => {
    const res = await chai.request(app).post("/api/v1/damage").send({
      streetNumber: "456",
      streetName: "Oak St",
      city: "Shelbyville",
      region: "South",
      type: "Flood",
      description: "Flooding caused significant damage to several homes."
    });

    chai
      .expect(res.body.message)
      .to.be.equal("Damage successfully recorded");
    anotherDamageId = res.body.data[0].id;
  });

  it("should retrieve all damage records", async () => {
    const res = await chai.request(app).get("/api/v1/damage");

    chai.expect(res.body.data).to.be.an("array");
  });

  it("should retrieve a damage record by ID", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/damage/${damageId}`);
    chai.expect(res.body.data.id).to.be.equal(damageId);
  });

  it("should filter damage records by streetName", async () => {
    const res = await chai.request(app).get("/api/v1/damage?streetName=Main St");

    chai.expect(res.body.data[0].streetName).to.be.equal("Main St");
  });

  it("should reject non-string type during update", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/damage/${damageId}`)
      .send({
        streetNumber: "123",
        streetName: "Main St",
        city: "Springfield",
        region: "Midwest",
        type: 123,
        description: "A large fire broke out in a commercial building."
      });

    chai.expect(res.body.message).to.be.equal("type should be a string");
  });

  it("should update a valid damage record", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/damage/${damageId}`)
      .send({
        streetNumber: "123",
        streetName: "Main St",
        city: "Springfield",
        region: "Midwest",
        type: "Earthquake",
        description: "An earthquake caused significant damage."
      });

    chai
      .expect(res.body.message)
      .to.be.equal(
        `Damage record with the id: ${damageId} successfully updated`
      );
  });

  it("should delete a damage record by ID", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/damage/${damageId}`);
       
    chai
      .expect(res.body.message)
      .to.be.equal(
        `Damage record with the id: ${damageId} successfully deleted`
      );
  });
});
