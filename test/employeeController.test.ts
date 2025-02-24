import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

// Mock the entire employeeService module
jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    // Clear any previous calls to mock functions
    jest.clearAllMocks();

    // Create fresh mocks for req, res, next before each test
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  //
  // 1. getAllEmployees
  //
  describe("getAllEmployees", () => {
    it("should return 200 and a list of employees on success", async () => {
      const mockEmployees = [
        { id: "1", name: "Alice" },
        { id: "2", name: "Bob" },
      ];

      // Mock the service to resolve with an array
      (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

      await employeeController.getAllEmployees(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Expect status 200, with message and data
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employees Retrieved",
        data: mockEmployees,
      });
      // Ensure next was not called
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if the service throws an error", async () => {
      const testError = new Error("Service Failure");
      (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(testError);

      await employeeController.getAllEmployees(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // The controller should not respond directly, it should call next(error)
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 2. getEmployeeById
  //
  describe("getEmployeeById", () => {
    it("should return 200 and the requested employee on success", async () => {
      const mockEmployee = { id: "1", name: "Alice" };
      (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

      mockReq.params = { id: "1" };

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Retrieved",
        data: mockEmployee,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if the employee is not found or service fails", async () => {
      const testError = new Error("Employee not found");
      (employeeService.getEmployeeById as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { id: "999" };

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 3. createEmployee
  //
  describe("createEmployee", () => {
    it("should return 201 and the new employee on success", async () => {
      const mockEmployee = { id: "123", name: "Charlie" };
      (employeeService.createEmployee as jest.Mock).mockResolvedValue(mockEmployee);

      mockReq.body = { name: "Charlie" };

      await employeeController.createEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Created",
        data: mockEmployee,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service throws", async () => {
      const testError = new Error("Service create failed");
      (employeeService.createEmployee as jest.Mock).mockRejectedValue(testError);

      mockReq.body = { name: "Charlie" };

      await employeeController.createEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 4. updateEmployee
  //
  describe("updateEmployee", () => {
    it("should return 200 and the updated employee on success", async () => {
      const mockEmployee = { id: "123", name: "Updated Name" };
      (employeeService.updateEmployee as jest.Mock).mockResolvedValue(mockEmployee);

      mockReq.params = { id: "123" };
      mockReq.body = { name: "Updated Name" };

      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Updated",
        data: mockEmployee,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service update fails", async () => {
      const testError = new Error("Update failed");
      (employeeService.updateEmployee as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { id: "123" };
      mockReq.body = { name: "Updated Name" };

      await employeeController.updateEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 5. deleteEmployee
  //
  describe("deleteEmployee", () => {
    it("should return 200 when employee is deleted successfully", async () => {
      (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(undefined);

      mockReq.params = { id: "123" };

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Deleted",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service delete fails", async () => {
      const testError = new Error("Delete failed");
      (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { id: "123" };

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 6. getEmployeesByBranch
  //
  describe("getEmployeesByBranch", () => {
    it("should return 200 and filtered employees for a branch", async () => {
      const mockEmployees = [
        { id: "1", name: "Alice", branchId: 1 },
        { id: "2", name: "Bob", branchId: 2 },
      ];
      (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

      mockReq.params = { branchId: "1" };

      await employeeController.getEmployeesByBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Expect only Alice to appear
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employees for Branch Retrieved",
        data: [{ id: "1", name: "Alice", branchId: 1 }],
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service fails", async () => {
      const testError = new Error("Service error");
      (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { branchId: "1" };

      await employeeController.getEmployeesByBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });

  //
  // 7. getEmployeesByDepartment
  //
  describe("getEmployeesByDepartment", () => {
    it("should return 200 and filtered employees by department", async () => {
      const mockEmployees = [
        { id: "1", name: "Alice", department: "Sales" },
        { id: "2", name: "Bob", department: "HR" },
      ];
      (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

      mockReq.params = { department: "Sales" };

      await employeeController.getEmployeesByDepartment(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Expect only Alice to appear
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employees by Department Retrieved",
        data: [{ id: "1", name: "Alice", department: "Sales" }],
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next(error) if service fails", async () => {
      const testError = new Error("Service error");
      (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(testError);

      mockReq.params = { department: "Sales" };

      await employeeController.getEmployeesByDepartment(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(testError);
    });
  });
});
