/**
 * @file Manages all  damage methods
 * @author Joanna Marowa
 */

import damageRepository from "../../repositories/damage.js";

const recordDamage = async (req, res) => {
  try {
    await damageRepository.create({
      streetNumber: req.body.streetNumber,
      streetName: req.body.streetName,
      city: req.body.city,
      region: req.body.region,
      type: req.body.type,
      description: req.body.description,
    });

    // Get all damage from the damage table
    const newDamage = await damageRepository.findAll();

    //send JSON response
    return res.status(201).json({
      message: "Damage successfully recorded",
      data: newDamage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDamages = async (req, res) => {
  try {
    // Extract filters from the query parameters
    const filters = {
      streetNumber: req.query.streetNumber || undefined,
      streetName: req.query.streetName || undefined,
      city: req.query.city || undefined,
      region: req.query.region || undefined,
      type: req.query.type || undefined,
    };
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const damage = await damageRepository.findAll(filters, sortBy, sortOrder);

    // Check if there are no institutions
    if (!damage) {
      return res.status(404).json({ message: "No damage record found" });
    }

    return res.status(200).json({
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDamage = async (req, res) => {
  try {
    const damage = await damageRepository.findById(req.params.id);
console.log()
    // Check if there is no institution
    if (!damage) {
      return res.status(404).json({
        message: `No damage record with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateDamage = async (req, res) => {
  try {
    // Find the institution by id
    let damage = await damageRepository.findById(req.params.id);

    // Check if there is no institution
    if (!damage) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }

    // Update the institution
    damage = await damageRepository.update(req.params.id, {
      // Data to be updated
      type: req.body.type,
      description: req.body.description,
    });

    return res.status(200).json({
      message: `Damage record with the id: ${req.params.id} successfully updated`,
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteDamage = async (req, res) => {
  try {
    const damage = await damageRepository.findById(req.params.id);

    if (!damage) {
      return res.status(404).json({
        message: `No damage with the id: ${req.params.id} found`,
      });
    }

    await damageRepository.delete(req.params.id);

    return res.json({
      message: `Damage record with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export { recordDamage, getDamages, getDamage, updateDamage, deleteDamage };
