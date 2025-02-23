import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "";

export function validate<T>(schema: ObjectSchema<T>, data: T): void {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(
      `Validation error: ${error.details.map(x => x.message).join(", ")}`
    );
  }
}

export function validateRequest(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = { ...req.body, ...req.params, ...req.query };
      validate(schema, data);
      next();
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: (error as Error).message,
      });
    }
  };
}
