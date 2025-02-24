import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";

// Mock the entire branchService module
jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  //
  // 1. getAllBranches
  //
  describe("getAllBranches", () => {
    it("should return 200 and a list of branches on success", async () => {
      const mockBranches = [
        { id: "1", name: "Main Branch" },
        { id: "2", name: "East Branch" },
      ];
      (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branches Retrieved",
        data: mockBranches,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service fails", async () => {
      const testError = new Error("Service error");
      (branchService.getAllBranches as jest.Mock).mockRejectedValue(testError);

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 2. createBranch
  //
  describe("createBranch", () => {
    it("should return 201 and the new branch on success", async () => {
      const mockBranch = { id: "1", name: "New Branch" };
      (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

      mockReq.body = { name: "New Branch" };

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Created",
        data: mockBranch,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service fails", async () => {
      const testError = new Error("Create branch failed");
      (branchService.createBranch as jest.Mock).mockRejectedValue(testError);

      mockReq.body = { name: "New Branch" };

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 3. updateBranch
  //
  describe("updateBranch", () => {
    it("should return 200 and the updated branch on success", async () => {
      const mockBranch = { id: "1", name: "Updated Branch" };
      (branchService.updateBranch as jest.Mock).mockResolvedValue(mockBranch);

      mockReq.params = { id: "1" };
      mockReq.body = { name: "Updated Branch" };

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Updated",
        data: mockBranch,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if update fails", async () => {
      const testError = new Error("Update failed");
      (branchService.updateBranch as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { id: "1" };
      mockReq.body = { name: "Updated Branch" };

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 4. deleteBranch
  //
  describe("deleteBranch", () => {
    it("should return 200 on successful deletion", async () => {
      (branchService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

      mockReq.params = { id: "1" };

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Deleted",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if delete fails", async () => {
      const testError = new Error("Delete branch failed");
      (branchService.deleteBranch as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { id: "1" };

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 5. getBranchById
  //
  describe("getBranchById", () => {
    it("should return 200 and the branch on success", async () => {
      const mockBranch = { id: "1", name: "Main Branch" };
      (branchService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

      mockReq.params = { id: "1" };

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Retrieved",
        data: mockBranch,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if the branch is not found or service fails", async () => {
      const testError = new Error("Branch not found");
      (branchService.getBranchById as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { id: "999" };

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });
});
