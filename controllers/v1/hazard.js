import HazardRepository from "../../repositories/hazard.js";



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
    const filters = {
      streetName: req.query.streetName     || undefined,
      streetNumber: req.query.streetNumber || undefined,
      city: req.query.city                 || undefined,
      region: req.query.region             || undefined,
      type: req.query.type                 || undefined,
    };

    // Extract the sortBy and sortOrder parameters from the query
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    // Retrieve hazards based on the filters, sorted by the specified column and order
    const hazards = await HazardRepository.findAll(filters, sortBy, sortOrder);

    // Check if there are no hazards
    if (!hazards || hazards.length === 0) {
      return res.status(404).json({ message: 'No hazards found' });
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
    const hazard = await HazardRepository.findById(req.params.id);

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
    let hazard = await HazardRepository.findById(req.params.id);
    if (!hazard) {
      return res.status(404).json({
        message: `No hazard record with the id: ${req.params.id} found`,
      });
    }
    hazard = await HazardRepository.update(req.params.id, req.body);
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
    const hazard = await HazardRepository.findById(req.params.id);
    if (!hazard) {
      return res.status(404).json({
        message: `No hazard record with the id: ${req.params.id} found`,
      });
    }
    await HazardRepository.delete(req.params.id);
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