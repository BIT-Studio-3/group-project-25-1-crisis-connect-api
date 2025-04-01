import Joi from "joi";

// Validation for creating a new hazard
const validatePostHazard = (req, res, next) => {
  const hazardSchema = Joi.object({
    streetName: Joi.string().min(3).max(100).required().messages({
      "string.base": "streetName should be a string",
      "string.empty": "streetName cannot be empty",
      "string.min": "streetName should have a minimum length of {#limit}",
      "string.max": "streetName should have a maximum length of {#limit}",
      "any.required": "streetName is required",
    }),
    streetNumber: Joi.string().min(1).max(10).required().messages({
      "string.base": "streetNumber should be a string",
      "string.empty": "streetNumber cannot be empty",
      "string.min": "streetNumber should have a minimum length of {#limit}",
      "string.max": "streetNumber should have a maximum length of {#limit}",
      "any.required": "streetNumber is required",
    }),
    city: Joi.string().min(3).max(100).required().messages({
      "string.base": "city should be a string",
      "string.empty": "city cannot be empty",
      "string.min": "city should have a minimum length of {#limit}",
      "string.max": "city should have a maximum length of {#limit}",
      "any.required": "city is required",
    }),
    region: Joi.string().min(3).max(100).required().messages({
      "string.base": "region should be a string",
      "string.empty": "region cannot be empty",
      "string.min": "region should have a minimum length of {#limit}",
      "string.max": "region should have a maximum length of {#limit}",
      "any.required": "region is required",
    }),
    type: Joi.string().min(3).max(100).required().messages({
      "string.base": "type should be a string",
      "string.empty": "type cannot be empty",
      "string.min": "type should have a minimum length of {#limit}",
      "string.max": "type should have a maximum length of {#limit}",
      "any.required": "type is required",
    }),
  });

  const { error } = hazardSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

// Validation for updating an existing hazard
const validatePutHazard = (req, res, next) => {
  const hazardSchema = Joi.object({
    streetName: Joi.string().min(3).max(100).optional().messages({
      "string.base": "streetName should be a string",
      "string.empty": "streetName cannot be empty",
      "string.min": "streetName should have a minimum length of {#limit}",
      "string.max": "streetName should have a maximum length of {#limit}",
    }),
    streetNumber: Joi.string().min(1).max(10).optional().messages({
      "string.base": "streetNumber should be a string",
      "string.empty": "streetNumber cannot be empty",
      "string.min": "streetNumber should have a minimum length of {#limit}",
      "string.max": "streetNumber should have a maximum length of {#limit}",
    }),
    city: Joi.string().min(3).max(100).optional().messages({
      "string.base": "city should be a string",
      "string.empty": "city cannot be empty",
      "string.min": "city should have a minimum length of {#limit}",
      "string.max": "city should have a maximum length of {#limit}",
    }),
    region: Joi.string().min(3).max(100).optional().messages({
      "string.base": "region should be a string",
      "string.empty": "region cannot be empty",
      "string.min": "region should have a minimum length of {#limit}",
      "string.max": "region should have a maximum length of {#limit}",
    }),
    type: Joi.string().min(3).max(100).optional().messages({
      "string.base": "type should be a string",
      "string.empty": "type cannot be empty",
      "string.min": "type should have a minimum length of {#limit}",
      "string.max": "type should have a maximum length of {#limit}",
    }),
  }).min(1); // Ensure at least one field is being updated

  const { error } = hazardSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};
