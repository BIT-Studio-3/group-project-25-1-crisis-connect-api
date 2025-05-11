import Joi from "joi";

const validatePostContact = (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
      "any.required": "name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "email should be a string",
      "string.email": "email must be a valid email address",
      "string.empty": "email cannot be empty",
      "any.required": "email is required",
    }),
    message: Joi.string().min(3).max(500).required().messages({
      "string.base": "message should be a string",
      "string.empty": "message cannot be empty",
      "string.min": "message should have a minimum length of {#limit}",
      "string.max": "message should have a maximum length of {#limit}",
      "any.required": "message is required",
    }),
  });

  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

