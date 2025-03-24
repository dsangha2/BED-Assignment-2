import Joi, { ObjectSchema } from 'joi';

export const employeeSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty"
  }),
  position: Joi.string().min(2).max(50).required().messages({
    "any.required": "Position is required",
    "string.empty": "Position cannot be empty"
  }),
  department: Joi.string().min(2).max(50).required().messages({
    "any.required": "Department is required",
    "string.empty": "Department cannot be empty"
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty"
  }),
  phone: Joi.string().pattern(/^[0-9\-+() ]+$/).required().messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty"
  }),
  branchId: Joi.string().required().messages({
    "any.required": "Branch ID is required"
  }),
});