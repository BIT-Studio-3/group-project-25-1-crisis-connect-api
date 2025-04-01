import fetch from "node-fetch";

import prisma from "../client.js";

import { validatePostInstitution } from "../../middleware/validation/institution.js";

// Simulate an Express-like request and response for validation
const validateInstitution = (institution) => {
  const req = { body: institution };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message.message);
        process.exit(1);
      },
    }),
  };

  validatePostInstitution(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedInstitutionsFromGitHub = async () => {
  try {
    const gistUrl =" https://gist.githubusercontent.com/marojm1/9a39de9358df38233b9994d6a00c8bc1/raw/f3d80c2713fddb89a058aeea8fc1e7d50d349b0b/seed-damage-github.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const institutionData = await response.json();

    const data = await Promise.all(
      institutionData.map(async (institution) => {
        validateInstitution(institution);
        return { ...institution };
      })
    );

    await prisma.institution.createMany({
      data: data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Institutions successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

seedInstitutionsFromGitHub();