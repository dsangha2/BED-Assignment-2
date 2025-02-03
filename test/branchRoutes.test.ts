import request from "supertest";
import app from "../src/app";
import {
    getAllBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchById,
} from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    getAllBranches: jest.fn((req, res) => res.status(200).send()),
    createBranch: jest.fn((req, res) => res.status(201).send()),
    updateBranch: jest.fn((req, res) => res.status(200).send()),
    deleteBranch: jest.fn((req, res) => res.status(200).send()),
    getBranchById: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/branches", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branches");
            expect(getAllBranches).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/branches", () => {
        it("should call createBranch controller", async () => {
            const mockBranch = {
                name: "Test Branch",
                address: "123 Test St",
                phone: "555-555-5555",
            };
            await request(app).post("/api/v1/branches").send(mockBranch);
            expect(createBranch).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller", async () => {
            const mockBranch = {
                name: "Updated Branch Name",
            };
            const mockId = "1";
            await request(app).put(`/api/v1/branches/${mockId}`).send(mockBranch);
            expect(updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", async () => {
            await request(app).delete("/api/v1/branches/1");
            expect(deleteBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("should call getBranchById controller", async () => {
            await request(app).get("/api/v1/branches/1");
            expect(getBranchById).toHaveBeenCalled();
        });
    });
});
