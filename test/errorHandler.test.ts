import { Request, Response, NextFunction } from "express";
import { RepositoryError, ServiceError } from "../src/api/v1/errors/errors";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import { errorResponse } from "../src/api/v1/models/responseModel";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock console.error to keep test output clean
console.error = jest.fn();

describe("Error Handler Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Express request/response objects
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Mock next function
    mockNext = jest.fn();
  });

  it("should handle RepositoryError with custom status code and error code", () => {
    // Arrange
    const testError = new RepositoryError(
      "Document not found",
      "DOCUMENT_NOT_FOUND",
      HTTP_STATUS.NOT_FOUND
    );

    // Act
    errorHandler(
      testError,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("Document not found", "DOCUMENT_NOT_FOUND")
    );
    expect(console.error).toHaveBeenCalledWith("Error: Document not found");
  });

  it("should handle ServiceError with custom status code and error code", () => {
    // Arrange
    const testError = new ServiceError(
      "Invalid input",
      "INVALID_INPUT",
      HTTP_STATUS.BAD_REQUEST
    );

    // Act
    errorHandler(
      testError,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("Invalid input", "INVALID_INPUT")
    );
    expect(console.error).toHaveBeenCalledWith("Error: Invalid input");
  });

  it("should handle a basic Error object with default status/code", () => {
    // Arrange
    const testError = new Error("Basic error");

    // Act
    errorHandler(
      testError,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
    );
    expect(console.error).toHaveBeenCalledWith("Error: Basic error");
  });

  it("should handle malformed Error objects gracefully", () => {
    // Arrange
    const malformedError = {} as Error; // Missing 'message'

    // Act
    errorHandler(
      malformedError,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
    );
    // The 'message' property is undefined in the log
    expect(console.error).toHaveBeenCalledWith("Error: undefined");
  });

  it("should handle null errors with a default 500 response", () => {
    // Arrange
    const nullError = null;

    // Act
    errorHandler(
      nullError,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
    );
    expect(console.error).toHaveBeenCalledWith(
      "Error: null or undefined error received"
    );
  });
});
