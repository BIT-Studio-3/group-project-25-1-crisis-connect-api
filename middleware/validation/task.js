import Joi from "joi";

const validatePostTask = (req, res, next) => {
  const institutionSchema = Joi.object({

    description : Joi.string().min(3).max(100).required().messages({
      "string.base": "description should be a string",
      "string.empty": "description cannot be empty",
      "string.min": "description should have a minimum length of {#limit}",
      "string.max": "description should have a maximum length of {#limit}",
      "any.required": "description  is required",
    }),
    requirements: Joi.string().min(3).max(100).required().messages({
      "string.base": "requirements should be a string",
      "string.empty": "requirements cannot be empty",
      "string.min": "requirements should have a minimum length of {#limit}",
      "string.max": "requirements should have a maximum length of {#limit}",
      "any.required": "requirements is required",
    }),
    urgency: Joi.string().min(1).max(100).required().messages({
      "string.base": "urgency should be a string",
      "string.empty": "urgency cannot be empty",
      "string.min": "urgency should have a minimum length of {#limit}",
      "string.max": "urgency should have a maximum length of {#limit}",
      "any.required": "urgency is required",
    }),
    resources: Joi.string().min(3).max(100).required().messages({
        "string.base": "resources should be a string",
        "string.empty": "resources cannot be empty",
        "string.min": "resources should have a minimum length of {#limit}",
        "string.max": "resources should have a maximum length of {#limit}",
        "any.required": "resources is required",
      }),
       assignedTo: Joi.string().min(3).max(100).required().messages({
        "string.base": " assignedTo should be a string",
        "string.empty": " assignedTo cannot be empty",
        "string.min": " assignedTo should have a minimum length of {#limit}",
        "string.max": " assignedTo should have a maximum length of {#limit}",
        "any.required": " assignedTo is required",
      }),
      supervisor: Joi.string().min(3).max(100).required().messages({
        "string.base": "supervisor should be a string",
        "string.empty": "supervisor cannot be empty",
        "string.min": "supervisor should have a minimum length of {#limit}",
        "string.max": "supervisor should have a maximum length of {#limit}",
        "any.required": "supervisor is required",
      }),
      status : Joi.string().min(3).max(100).required().messages({
        "string.base": "status  should be a string",
        "string.empty": "status  cannot be empty",
        "string.min": "status  should have a minimum length of {#limit}",
        "string.max": "status  should have a maximum length of {#limit}",
        "any.required": "status  is required",
      }),
      deadline: Joi.string().min(3).max(100).required().messages({
        "string.base": "deadline should be a string",
        "string.empty": "deadline cannot be empty",
        "string.min": "deadline should have a minimum length of {#limit}",
        "string.max": "deadline should have a maximum length of {#limit}",
        "any.required": "deadline is required",
      }),
      completedAt: Joi.string().min(3).max(100).required().messages({
        "string.base": "completedAt should be a string",
        "string.empty": "completedAt cannot be empty",
        "string.min": "completedAt should have a minimum length of {#limit}",
        "string.max": "completedAt should have a maximum length of {#limit}",
        "any.required": "completedAt is required",
      }),
      completedAt: Joi.string().min(3).max(100).required().messages({
        "string.base": "completedAt should be a string",
        "string.empty": "completedAt cannot be empty",
        "string.min": "completedAt should have a minimum length of {#limit}",
        "string.max": "completedAt should have a maximum length of {#limit}",
        "any.required": "completedAt is required",
      }),
  });

  const { error } = institutionSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

const validatePutTask = (req, res, next) => {
  const institutionSchema = Joi.object({
    urgency: Joi.string().min(3).max(100).optional().messages({
      "string.base": "urgency should be a string",
      "string.empty": "urgency cannot be empty",
      "string.min": "urgency should have a minimum length of {#limit}",
      "string.max": "urgency should have a maximum length of {#limit}",
    }),
   
      status : Joi.string().min(3).max(100).optional().messages({
        "string.base": "status  should be a string",
        "string.empty": "status  cannot be empty",
        "string.min": "status  should have a minimum length of {#limit}",
        "string.max": "status  should have a maximum length of {#limit}",
      }),
      completedAt: Joi.string().min(3).max(100).optional().messages({
        "string.base": "completedAt should be a string",
        "string.empty": "completedAt cannot be empty",
        "string.min": "completedAt should have a minimum length of {#limit}",
        "string.max": "completedAt should have a maximum length of {#limit}",
      }),
  }).min(1); // Ensure at least one field is being updated

  const { error } = institutionSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostTask, validatePutTask };