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

const getHazard = async (req, res) => {
    try {
      const hazard = await prisma.hazard.findUnique({
        where: { id: req.params.id },
      });

      if (!hazard) {
        return res.status(404).json({
          message: `No hazard record with the id: ${req.params.id} found`,
        });
      }
  
      return res.status(200).json({
        data: hazard,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};


const updateHazard = async (req, res) => {
    try {
      let hazard = await prisma.hazard.findUnique({
        where: { id: req.params.id },
      });
  
      if (!hazard) {
        return res.status(404).json({
          message: `No hazard record with the id: ${req.params.id} found`,
        });
      }
  
      hazard = await prisma.hazard.update({
        where: { id: req.params.id },
        data: {
          streetName: req.body.streetName,
          streetNumber: req.body.streetNumber,
          city: req.body.city,
          region: req.body.region,
          type: req.body.type,
        },
      });
  
      return res.status(200).json({
        message: `Hazard record with the id: ${req.params.id} successfully updated`,
        data: hazard,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};


const deleteHazard = async (req, res) => {
    try {
      const hazard = await prisma.hazard.findUnique({
        where: { id: req.params.id },
      });
  
      if (!hazard) {
        return res.status(404).json({
          message: `No hazard record with the id: ${req.params.id} found`,
        });
      }
  
      await prisma.hazard.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `Hazard record with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
};


export {
    createHazard,
    getHazards,
    getHazard,
    updateHazard,
    deleteHazard,
  };