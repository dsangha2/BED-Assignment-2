/**
 * Employee Controller (employeeController.ts)
 *
 * This file defines functions (controllers) for handling incoming requests
 * related to employees. These functions interact with the employee service
 * (employeeService.ts) to perform CRUD operations on employees.
 */

import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import type { Employee } from "../services/employeeService";

/**
 * @description Get all employees.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees: Employee[] = await employeeService.getAllEmployees();
    res.status(200).json({ message: "Employees Retrieved", data: employees });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single employee by ID.
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employee: Employee = await employeeService.getEmployeeById(req.params.id);
      res.status(200).json({ message: "Employee Retrieved", data: employee });
    } catch (error) {
      next(error);
    }
  };

/**
 * @description Create a new employee.
 * @route POST /
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newEmployee: Employee = await employeeService.createEmployee(req.body);
      res.status(201).json({ message: "Employee Created", data: newEmployee });
    } catch (error) {
      next(error);
    }
  };