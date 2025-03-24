/**
 * Branch Routes (branchRoutes.ts)
 *
 * This file defines the routes for managing branches in our application.
 * It uses the Express framework for routing and makes calls to the branch controller
 * (branchController.ts) to handle the logic for each route.
 */
import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchema } from "../schemas/branchSchema";

const router: Router = express.Router();


/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch
 *     responses:
 *       200:
 *         description: A single branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);

/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch);

/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Branch data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created
 *       400:
 *         description: Invalid input
 */
router.post("/", validateRequest(branchSchema), branchController.createBranch);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch
 *     requestBody:
 *       description: Branch data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated
 *       404:
 *         description: Branch not found
 */
router.put("/:id", validateRequest(branchSchema), branchController.updateBranch);

export default router;