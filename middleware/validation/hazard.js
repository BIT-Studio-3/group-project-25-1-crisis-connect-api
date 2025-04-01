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
