import request from "supertest";
import app from "../src/app";
import {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeesByBranch,
    getEmployeesByDepartment,
} from "../src/api/v1/controllers/employeeController";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(200).send()),
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    updateEmployee: jest.fn((req, res) => res.status(200).send()),
    deleteEmployee: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByBranch: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByDepartment: jest.fn((req, res) => res.status(200).send()),
}));

describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/employees", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employees");
            expect(getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", async () => {
            const mockEmployee = {
                name: "Test Employee",
                position: "Tester",
                department: "QA",
                email: "test@example.com",
                phone: "123-456-7890",
                branchId: 1,
            };

            await request(app).post("/api/v1/employees").send(mockEmployee);
            expect(createEmployee).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller", async () => {
            const mockEmployee = {
                name: "Updated Employee",
                position: "Senior Tester",
            };
            const mockId = "1";

            await request(app).put(`/api/v1/employees/${mockId}`).send(mockEmployee);
            expect(updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employees/1");
            expect(deleteEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/branch/:branchId", () => {
        it("should call getEmployeesByBranch controller", async () => {
            await request(app).get("/api/v1/employees/branch/1");
            expect(getEmployeesByBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/department/:department", () => {
        it("should call getEmployeesByDepartment controller", async () => {
            await request(app).get("/api/v1/employees/department/QA");
            expect(getEmployeesByDepartment).toHaveBeenCalled();
        });
    });
});
