import bcryptjs from "bcryptjs";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it, before } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt();
  return bcryptjs.hash(password, salt);
};

describe("Auth", () => {
  before(async () => {
    // Ensure a fresh admin user exists in the database
    await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        password: await hashPassword("password123"),
        role: "FENZ",
      },
    });
  });

  it("should login an admin user and return a token", async () => {
    const res = await chai.request(app).post("/api/v1/auth/login").send({
      emailAddress: "john.doe@example.com",
      password: "password123",
    });

    chai.expect(res).to.have.status(200);
    chai.expect(res.body.token).to.exist;
  });
});