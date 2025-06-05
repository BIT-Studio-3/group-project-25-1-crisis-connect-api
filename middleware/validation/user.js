import Joi from "joi";

// Updated enum values from your Prisma schema
const roleEnum = ['FENZ', 'civilDefence', 'Police', 'NEMA'];

export const validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(100).required().messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name cannot be empty',
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().min(1).max(100).required().messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name cannot be empty',
      'any.required': 'Last name is required',
    }),
    role: Joi.string().valid(...roleEnum).required().messages({
      'any.only': `Role must be one of: ${roleEnum.join(', ')}`,
      'any.required': 'Role is required',
    }),
    emailAddress: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email address is required',
    }),
    password: Joi.string().min(6).max(128).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be at most 128 characters',
      'any.required': 'Password is required',
    }),
    loginAttempts: Joi.number().integer().min(0).optional().messages({
      'number.base': 'Login attempts must be a number',
      'number.min': 'Login attempts cannot be negative',
    }),
    lastLoginAttempt: Joi.date().iso().optional().messages({
      'date.base': 'Last login attempt must be a valid ISO date',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => e.message) });
  }

  next();
};
