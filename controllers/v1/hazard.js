/**
 * @file Manages all  damage methods
 * @author Mustafa Habibullah
 */

import hazardRepository from "../../repositories/hazard.js";

const createHazard = async (req, res) => {
  try {
      await hazardRepository.create({
        data: {
          streetNumber: req.body.streetNumber,
          streetName: req.body.streetName,
          city: req.body.city,
          region: req.body.region,
          type: req.body.type,
          description: req.body.description,
        },
      });
  
      const newHazards = await hazardRepository.findMany();
  
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
      description  : req.query.type        || undefined,
    };

    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    const hazards = await hazardRepository.findAll(filters, sortBy, sortOrder);

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
    const hazard = await hazardRepository.findById(req.params.id);

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
    let hazard = await hazardRepository.findById(req.params.id);

    if (!hazard) {
      return res.status(404).json({
        message: `No hazard record with the id: ${req.params.id} found`,
      });
    }

    hazard = await hazardRepository.update(req.params.id, {
      type: req.body.type,
      description: req.body.description,
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
    const hazard = await hazardRepository.findById(req.params.id);
    if (!hazard) {
      return res.status(404).json({
        message: `No hazard record with the id: ${req.params.id} found`,
      });
    }
    await hazardRepository.delete(req.params.id);

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