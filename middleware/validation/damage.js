import Joi from "joi";

const validatePostDamage = (req, res, next) => {
  const damageSchema = Joi.object({
    streetNumber: Joi.string().min(1).max(100).required().messages({
      "string.base": "streetNumber should be a string",
      "string.empty": "streetNumber cannot be empty",
      "string.min": "streetNumber should have a minimum length of {#limit}",
      "string.max": "streetNumber should have a maximum length of {#limit}",
      "any.required": "streetNumber is required",
    }),
    streetName: Joi.string().min(3).max(100).required().messages({
      "string.base": "streetName should be a string",
      "string.empty": "streetName cannot be empty",
      "string.min": "streetName should have a minimum length of {#limit}",
      "string.max": "streetName should have a maximum length of {#limit}",
      "any.required": "streetName is required",
    }),
    city: Joi.string().min(3).max(100).required().messages({
      "string.base": "city should be a string",
      "string.empty": "city cannot be empty",
      "string.min": "city should have a minimum length of {#limit}",
      "string.max": "city should have a maximum length of {#limit}",
      "any.required": "city is required",
    }),
    region: Joi.string().min(1).max(100).required().messages({
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
    description: Joi.string().min(3).max(100).required().messages({
      "string.base": "description should be a string",
      "string.empty": "description cannot be empty",
      "string.min": "description should have a minimum length of {#limit}",
      "string.max": "description should have a maximum length of {#limit}",
      "any.required": "description is required",
    }),
  });

  const { error } = damageSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

const validatePutDamage = (req, res, next) => {
  const damageSchema = Joi.object({
    streetNumber: Joi.string().min(3).max(100).optional().messages({
      "string.base": "streetNumber should be a string",
      "string.empty": "streetNumber cannot be empty",
      "string.min": "streetNumber should have a minimum length of {#limit}",
      "string.max": "streetNumber should have a maximum length of {#limit}",
    }),
    streetName: Joi.string().min(3).max(100).optional().messages({
      "string.base": "streetName should be a string",
      "string.empty": "streetName cannot be empty",
      "string.min": "streetName should have a minimum length of {#limit}",
      "string.max": "streetName should have a maximum length of {#limit}",
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
    description: Joi.string().min(3).max(100).optional().messages({
      "string.base": "description should be a string",
      "string.empty": "description cannot be empty",
      "string.min": "description should have a minimum length of {#limit}",
      "string.max": "description should have a maximum length of {#limit}",
    }),
  }).min(1); // Ensure at least one field is provided for update

  const { error } = damageSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostDamage, validatePutDamage };
