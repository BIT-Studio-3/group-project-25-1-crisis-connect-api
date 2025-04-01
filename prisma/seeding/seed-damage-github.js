import fetch from "node-fetch";

import prisma from "../client.js";

import { validatePostDamage } from "../../middleware/validation/damage.js";

// Simulate an Express-like request and response for validation
const validateDamage = (damage) => {
  const req = { body: damage };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message.message);
        process.exit(1);
      },
    }),
  };

  validatePostDamage(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedDamagesFromGitHub = async () => {
  try {
    const gistUrl =" https://gist.githubusercontent.com/marojm1/9a39de9358df38233b9994d6a00c8bc1/raw/f3d80c2713fddb89a058aeea8fc1e7d50d349b0b/seed-damage-github.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const damageData = await response.json();

    const data = await Promise.all(
      damageData.map(async (damage) => {
        validateDamage(damage);
        return { ...damage };
      })
    );

    await prisma.damage.createMany({
      data: data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("damages successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

seedDamagesFromGitHub();