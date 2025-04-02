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
      },
    }),
  };

  try {
    validatePostDamage(req, res, () => {}); // Pass an empty function since we're not using next()
  } catch (err) {
    console.log(`Validation failed for damage: ${JSON.stringify(damage)}. Error: ${err.message}`);
  }
};

const seedDamagesFromGitHub = async () => {
  try {
    const gistUrl =
      "https://gist.githubusercontent.com/marojm1/9a39de9358df38233b9994d6a00c8bc1/raw/f3d80c2713fddb89a058aeea8fc1e7d50d349b0b/seed-damage-github.json"; // Replace with the raw URL of your GitHub Gist
    
    const response = await fetch(gistUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from Gist. Status: ${response.status}`);
    }

    const damageData = await response.json();

    const data = await Promise.all(
      damageData.map(async (damage) => {
        validateDamage(damage); // Perform validation
        return { ...damage }; // Return a copy of the damage data
      })
    );

    // Insert data into Prisma database
    await prisma.damage.createMany({
      data: data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Damages successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

// Export the function to be called manually later
export default seedDamagesFromGitHub;
