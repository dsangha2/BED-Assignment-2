/**
 * Employee Routes (employeeRoutes.ts)
 *
 * This file defines the routes for managing employees in our application.
 * It uses the Express framework for routing and makes calls to the employee controller
 * (employeeController.ts) to handle the logic for each route.
 */
import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all employees.
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /:id
 * @description Get a single employee by ID.
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @route POST /
 * @description Create a new employee.
 */
router.post("/", employeeController.createEmployee);

/**
 * @route PUT /:id
 * @description Update an existing employee.
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 */
router.delete("/:id", employeeController.deleteEmployee);

export default router;
