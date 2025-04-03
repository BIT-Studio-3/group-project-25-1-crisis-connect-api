import fetch from "node-fetch";
import prisma from "../client.js";
import { validatePostHazard } from "../../middleware/validation/hazard.js"; 

const validateHazard = (hazard) => {
  const req = { body: hazard };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message.message);
        process.exit(1);
      },
    }),
  };

  validatePostHazard(req, res, () => {}); 
};

const seedHazardsFromGitHub = async () => {
  try {
    const gistUrl = 
    "https://gist.githubusercontent.com/Mustafa12315/6f082a88a0d17d6443106ac06997c49f/raw/910fe620a57f852ac9853348829909bcca5c43f4/hazards.json"; 
    const response = await fetch(gistUrl);
    const hazardData = await response.json();

    const data = await Promise.all(
      hazardData.map(async (hazard) => {
        validateHazard(hazard); 
        return { ...hazard };
      })
    );

    await prisma.hazard.createMany({
      data: data,
      skipDuplicates: true, 
    });

    console.log("Hazards successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

export default seedHazardsFromGitHub();
