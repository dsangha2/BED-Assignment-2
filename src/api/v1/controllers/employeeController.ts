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

/**
 * @description Update an existing employee.
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const updatedEmployee: Employee = await employeeService.updateEmployee(
        req.params.id,
        req.body
      );
      res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
      next(error);
    }
  };

/**
 * @description Delete an employee.
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await employeeService.deleteEmployee(req.params.id);
      res.status(200).json({ message: "Employee Deleted" });
    } catch (error) {
      next(error);
    }
  };

/**
 * @description Get employees for a specific branch.
 * @route GET /branch/:branchId
 * @returns {Promise<void>}
 */
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const branchId = Number(req.params.branchId);
      const employees = await employeeService.getAllEmployees();
      const filteredEmployees = employees.filter(emp => emp.branchId === branchId);
      res.status(200).json({ message: "Employees for Branch Retrieved", data: filteredEmployees });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * @description Get employees by department.
   * @route GET /department/:department
   * @returns {Promise<void>}
   */
  export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const department = req.params.department;
      const employees = await employeeService.getAllEmployees();
      const filteredEmployees = employees.filter(emp =>
        emp.department.toLowerCase() === department.toLowerCase()
      );
      res.status(200).json({ message: "Employees by Department Retrieved", data: filteredEmployees });
    } catch (error) {
      next(error);
    }
  };