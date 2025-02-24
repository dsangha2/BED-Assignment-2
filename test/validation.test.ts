import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import { employeeSchema } from "../src/api/v1/schemas/employeeSchema";
import { branchSchema } from "../src/api/v1/schemas/branchSchema";

/**
 * Employee interface for testing.
 */
interface Employee {
  id?: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: string;
}

/**
 * Branch interface for testing.
 */
interface Branch {
  id?: string;
  name: string;
  address: string;
  phone: string;
}

/**
 * Tests for the pure "validate" function with employeeSchema and branchSchema.
 */
describe("validate function for employees and branches", () => {
  //
  // EMPLOYEE SCHEMA TESTS
  //
  describe("Employee Schema", () => {
    it("should not throw an error for valid employee data", () => {
      const data: Employee = {
        name: "Alice",
        position: "Manager",
        department: "Sales",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: "branch123",
      };

      expect(() => validate(employeeSchema, data)).not.toThrow();
    });

    it("should throw an error for missing name", () => {
      const data: Partial<Employee> = {
        position: "Manager",
        department: "Sales",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: "branch123",
      };

      expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Name is required"
      );
    });

    it("should throw an error for empty phone", () => {
      const data: Employee = {
        name: "Bob",
        position: "Clerk",
        department: "HR",
        email: "bob@example.com",
        phone: "",
        branchId: "branch123",
      };

      expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Phone number cannot be empty"
      );
    });

    it("should throw an error for invalid email format", () => {
      const data: Employee = {
        name: "Carol",
        position: "Sales Rep",
        department: "Sales",
        email: "not-an-email",
        phone: "555-123-4567",
        branchId: "branch123",
      };

      expect(() => validate(employeeSchema, data)).toThrow(
        'Validation error: "email" must be a valid email'
      );
    });
  });

  //
  // BRANCH SCHEMA TESTS
  //
  describe("Branch Schema", () => {
    it("should not throw an error for valid branch data", () => {
      const data: Branch = {
        name: "Main Branch",
        address: "123 Main Street",
        phone: "555-555-1234",
      };

      expect(() => validate(branchSchema, data)).not.toThrow();
    });

    it("should throw an error for missing address", () => {
      const data: Partial<Branch> = {
        name: "Main Branch",
        phone: "555-555-1234",
      };

      expect(() => validate(branchSchema, data)).toThrow(
        "Validation error: Address is required"
      );
    });

    it("should throw an error for empty name", () => {
      const data: Branch = {
        name: "",
        address: "456 Elm Street",
        phone: "555-555-1234",
      };

      expect(() => validate(branchSchema, data)).toThrow(
        "Validation error: Branch name cannot be empty"
      );
    });
  });
});

/**
 * Tests for the "validateRequest" middleware with employeeSchema and branchSchema.
 * Mocks req, res, and next to simulate Express behavior.
 */
describe("validateRequest middleware for employees and branches", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  //
  // EMPLOYEE MIDDLEWARE TESTS
  //
  describe("validateRequest(employeeSchema)", () => {
    it("should call next for valid employee data", () => {
      req.body = {
        name: "Alice",
        position: "Manager",
        department: "Sales",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: "branch123",
      };

      validateRequest(employeeSchema)(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for missing name", () => {
      req.body = {
        position: "Manager",
        department: "Sales",
        email: "alice@example.com",
        phone: "123-456-7890",
        branchId: "branch123",
      };

      validateRequest(employeeSchema)(req as Request, res as Response, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Validation error: Name is required",
      });
    });

    it("should return 400 for empty phone", () => {
      req.body = {
        name: "Alice",
        position: "Manager",
        department: "Sales",
        email: "alice@example.com",
        phone: "",
        branchId: "branch123",
      };

      validateRequest(employeeSchema)(req as Request, res as Response, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Validation error: Phone number cannot be empty",
      });
    });
  });

  //
  // BRANCH MIDDLEWARE TESTS
  //
  describe("validateRequest(branchSchema)", () => {
    it("should call next for valid branch data", () => {
      req.body = {
        name: "Main Branch",
        address: "123 Main Street",
        phone: "555-555-1234",
      };

      validateRequest(branchSchema)(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for missing address", () => {
      req.body = {
        name: "Main Branch",
        phone: "555-555-1234",
      };

      validateRequest(branchSchema)(req as Request, res as Response, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Validation error: Address is required",
      });
    });

    it("should return 400 for empty name", () => {
      req.body = {
        name: "",
        address: "456 Elm Street",
        phone: "555-555-1234",
      };

      validateRequest(branchSchema)(req as Request, res as Response, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Validation error: Branch name cannot be empty",
      });
    });
  });
});
