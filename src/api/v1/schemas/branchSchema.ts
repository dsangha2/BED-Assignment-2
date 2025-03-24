import Joi, { ObjectSchema } from 'joi';

export const branchSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Branch name is required",
    "string.empty": "Branch name cannot be empty"
  }),
  address: Joi.string().min(5).max(100).required().messages({
    "any.required": "Address is required",
    "string.empty": "Address cannot be empty"
  }),
  phone: Joi.string().pattern(/^[0-9\-+() ]+$/).required().messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty"
  }),
});
