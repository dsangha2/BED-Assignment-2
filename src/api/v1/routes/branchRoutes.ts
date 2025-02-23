/**
 * Branch Routes (branchRoutes.ts)
 *
 * This file defines the routes for managing branches in our application.
 * It uses the Express framework for routing and makes calls to the branch controller
 * (branchController.ts) to handle the logic for each route.
 */
import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all branches.
 */
router.get("/", branchController.getAllBranches);

/**
 * @route GET /:id
 * @description Get a branch by ID.
 */
router.get("/:id", branchController.getBranchById);

/**
 * @route POST /
 * @description Create a new branch.
 */
router.post("/", branchController.createBranch);

/**
 * @route PUT /:id
 * @description Update an existing branch.
 */
router.put("/:id", branchController.updateBranch);

/**
 * @route DELETE /:id
 * @description Delete a branch.
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
