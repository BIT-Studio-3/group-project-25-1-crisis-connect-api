// import * as chaiModule from "chai";
// import chaiHttp from "chai-http";
// import { describe, it } from "mocha";

// import app from "../app.js";

// const chai = chaiModule.use(chaiHttp);

// let hazardId;
// export let anotherHazardId; 

// describe("Hazards", () => {
//   it("should reject non-string streetName", async () => {
//     const res = await chai
//       .request(app)
//       .post("/api/v1/hazards")
//       .send({ streetName: 123, streetNumber: "123", city: "Auckland", region: "Auckland", type: "Fire" });

//     chai.expect(res.body.message).to.be.equal("streetName should be a string");
//   });

//   it("should create a valid hazard", async () => {
//     const res = await chai.request(app).post("/api/v1/hazards").send({
//       streetName: "Main St",
//       streetNumber: "123",
//       city: "Auckland",
//       region: "Auckland",
//       type: "Fire"
//     });

//     chai
//       .expect(res.body.message)
//       .to.be.equal("Hazard successfully created");
//     hazardId = res.body.data[0].id;
//   });

//   it("should create another valid hazard", async () => {
//     const res = await chai.request(app).post("/api/v1/hazards").send({
//       streetName: "Broadway",
//       streetNumber: "456",
//       city: "Waikato",
//       region: "Waikato",
//       type: "Flood"
//     });

//     chai
//       .expect(res.body.message)
//       .to.be.equal("Hazard successfully created");
//     anotherHazardId = res.body.data[0].id;
//   });

//   it("should retrieve all hazards", async () => {
//     const res = await chai.request(app).get("/api/v1/hazards");

//     chai.expect(res.body.data).to.be.an("array");
//   });

//   it("should retrieve a hazard by ID", async () => {
//     const res = await chai
//       .request(app)
//       .get(`/api/v1/hazards/${hazardId}`);

//     chai.expect(res.body.data.streetName).to.be.equal("Main St");
//   });

//   it("should filter hazards by streetName", async () => {
//     const res = await chai.request(app).get("/api/v1/hazards?streetName=Main");

//     chai.expect(res.body.data[0].streetName).to.be.equal("Main St");
//   });

//   it("should reject non-string type during update", async () => {
//     const res = await chai
//       .request(app)
//       .put(`/api/v1/hazards/${hazardId}`)
//       .send({
//         streetName: "Queen St",
//         streetNumber: "789",
//         city: "Wellington",
//         region: "Wellington",
//         type: 123
//       });

//     chai.expect(res.body.message).to.be.equal("type should be a string");
//   });

//   it("should update a valid hazard", async () => {
//     const res = await chai
//       .request(app)
//       .put(`/api/v1/hazards/${hazardId}`)
//       .send({
//         streetName: "Queen St",
//         streetNumber: "789",
//         city: "Wellington",
//         region: "Wellington",
//         type: "Earthquake"
//       });

//     chai
//       .expect(res.body.message)
//       .to.be.equal(
//         `Hazard with the id: ${hazardId} successfully updated`
//       );
//   });

//   it("should delete a hazard by ID", async () => {
//     const res = await chai
//       .request(app)
//       .delete(`/api/v1/hazards/${hazardId}`);

//     chai
//       .expect(res.body.message)
//       .to.be.equal(
//         `Hazard with the id: ${hazardId} successfully deleted`
//       );
//   });
// });
