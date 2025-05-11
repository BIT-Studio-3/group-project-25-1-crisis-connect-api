/**
 * @file Manages all  contact methods
 * @author Mustafa Habibullah
 */

import contactRepository from "../../repositories/contact.js";

const recordContact = async (req, res) => {
  try {
    await contactRepository.create({
      streetNumber: req.body.streetNumber,
      streetName: req.body.streetName,
      city: req.body.city,
      region: req.body.region,
      type: req.body.type,
      description: req.body.description,
    });

    // Get all contact from the contact table
    const newContact = await contactRepository.findAll();

    //send JSON response
    return res.status(201).json({
      message: "Contact successfully recorded",
      data: newContact,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getContacts = async (req, res) => {
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

    const contact = await contactRepository.findAll(filters, sortBy, sortOrder);

    // Check if there are no contacts
    if (!contact) {
      return res.status(404).json({ message: "No contact record found" });
    }

    return res.status(200).json({
      data: contact,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await contactRepository.findById(req.params.id);
console.log()
    // Check if there is no contact
    if (!contact) {
      return res.status(404).json({
        message: `No contact record with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: contact,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

