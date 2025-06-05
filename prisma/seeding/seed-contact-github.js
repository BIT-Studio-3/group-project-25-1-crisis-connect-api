import fetch from "node-fetch";
import prisma from "../client.js";
import { validatePostContact } from "../../middleware/validation/contact.js"; 

const validateContact = (contact) => {
  const req = { body: contact };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message.message);
        process.exit(1);
      },
    }),
  };

  validatePostContact(req, res, () => {}); 
};

const seedContactsFromGitHub = async () => {
  try {
    const gistUrl = 
    "https://gist.githubusercontent.com/Mustafa12315/92a801765d676bc5825b37620081d025/raw/54cb232c6995e77445f3f15713082e0e62f2e2ab/contact.js"; 
    const response = await fetch(gistUrl);
    const contactData = await response.json();

    const data = await Promise.all(
      contactData.map(async (contact) => {
        validateContact(contact); 
        return { ...contact };
      })
    );

    await prisma.contact.createMany({
      data: data,
      skipDuplicates: true, 
    });

    console.log("Contacts successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

export default seedContactsFromGitHub();
