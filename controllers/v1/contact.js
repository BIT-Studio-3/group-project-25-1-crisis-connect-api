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

