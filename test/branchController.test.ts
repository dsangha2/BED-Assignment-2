import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllBranches", () => {
        it("should handle successful operation", async () => {
            const mockBranches = [
                { id: "1", name: "Test Branch", address: "123 Test St", phone: "555-555-5555" },
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
        });
    });

    // Additional tests for createBranch, updateBranch, deleteBranch, and getBranchById can follow a similar pattern.
});
