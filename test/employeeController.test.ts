import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockEmployees = [
                {
                    id: "1",
                    name: "Test Employee",
                    position: "Tester",
                    department: "QA",
                    email: "test@example.com",
                    phone: "123-456-7890",
                    branchId: 1,
                },
            ];

            (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });
        });
    });

    // Additional tests for createEmployee, updateEmployee, deleteEmployee,
    // getEmployeesByBranch, and getEmployeesByDepartment can follow a similar pattern.
});
