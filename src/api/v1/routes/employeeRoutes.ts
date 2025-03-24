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
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *         firstName:
 *           type: string
 *           description: Employee's first name
 *         lastName:
 *           type: string
 *           description: Employee's last name
 *         department:
 *           type: string
 *           description: Department where the employee works
 *         branchId:
 *           type: number
 *           description: ID of the branch the employee is assigned to
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - department
 */

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * /employees/branch/{branchId}:
 *   get:
 *     summary: Get employees for a specific branch
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the branch
 *     responses:
 *       200:
 *         description: A list of employees for the given branch
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

/**
 * @openapi
 * /employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: The department name
 *     responses:
 *       200:
 *         description: A list of employees in the specified department
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: An employee object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Employee data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created
 *       400:
 *         description: Invalid input
 */
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee
 *     requestBody:
 *       description: Updated employee data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated
 *       404:
 *         description: Employee not found
 */
router.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);

export default router;