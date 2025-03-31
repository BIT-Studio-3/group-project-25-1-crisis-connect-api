import prisma from "../../prisma/client.js";
// import HazardRepository from "../../repositories/hazard.js";



const createHazard = async (req, res) => {
    try {
      await prisma.hazard.create({
        data: {
          streetNumber: req.body.streetNumber,
          streetName: req.body.streetName,
          city: req.body.city,
          region: req.body.region,
          type: req.body.type,
        },
      });
  
      const newHazards = await prisma.hazard.findMany();
  
      return res.status(201).json({
        message: "Hazard successfully recorded",
        data: newHazards,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

const getHazards = async (req, res) => {
    try {
      const hazards = await prisma.hazard.findMany();
  
      // Check if there are no hazards
      if (!hazards) {
        return res.status(404).json({ message: "No hazards record found" });
      }
  
      return res.status(200).json({
        data: hazards,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};

