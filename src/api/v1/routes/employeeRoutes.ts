/**
 * Employee Routes (employeeRoutes.ts)
 *
 * This file defines the routes for managing employees in our application.
 * It uses the Express framework for routing and makes calls to the employee controller
 * (employeeController.ts) to handle the logic for each route.
 */
import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../schemas/employeeSchema";

const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all employees.
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /branch/:branchId
 * @description Get employees for a specific branch.
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @route GET /department/:department
 * @description Get employees by department.
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

/**
 * @route GET /:id
 * @description Get an employee by ID.
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 */
router.delete("/:id", employeeController.deleteEmployee);

/**
 * @route POST /
 * @description Create a new employee.
 */
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);

/**
 * @route PUT /:id
 * @description Update an existing employee.
 */
router.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);

export default router;
