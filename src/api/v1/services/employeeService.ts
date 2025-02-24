/**
 * Employee Service (employeeService.ts)
 *
 * Replaces the in-memory array with Firestore calls via a repository.
 */
import * as firestoreRepo from "../repositories/firestoreRepository";
import { RepositoryError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @interface Employee
 * Represents an employee record in Firestore.
 */
export interface Employee {
  id?: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}

// The Firestore collection name for employees
const COLLECTION = "employees";

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    // Fetch all docs from the "employees" collection
    const snapshot = await firestoreRepo.getDocuments(COLLECTION);

    // Convert each Firestore doc into an Employee
    const employees: Employee[] = [];
    snapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() } as Employee);
    });
    return employees;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get an employee by ID.
 * @param {string} id - The Firestore doc ID of the employee
 * @returns {Promise<Employee>}
 * @throws {RepositoryError} If the employee is not found
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const docSnap = await firestoreRepo.getDocumentById(COLLECTION, id);
    return { id: docSnap.id, ...docSnap.data() } as Employee;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Create a new employee.
 * @param {Omit<Employee, "id">} employeeData - Employee fields (no ID)
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (
  employeeData: Omit<Employee, "id">
): Promise<Employee> => {
  try {
    // Create a new Firestore doc
    const docId = await firestoreRepo.createDocument<Employee>(COLLECTION, employeeData);
    return { id: docId, ...employeeData };
  } catch (error) {
    throw error;
  }
};

/**
 * @description Update an existing employee.
 * @param {string} id - The Firestore doc ID of the employee
 * @param {Partial<Omit<Employee, "id">>} employeeData - Fields to update
 * @returns {Promise<Employee>}
 * @throws {RepositoryError} If the employee with the given ID is not found
 */
export const updateEmployee = async (
  id: string,
  employeeData: Partial<Omit<Employee, "id">>
): Promise<Employee> => {
  try {
    // Check if doc exists (throws RepositoryError if not)
    await firestoreRepo.getDocumentById(COLLECTION, id);

    // Update doc with new fields
    await firestoreRepo.updateDocument<Employee>(COLLECTION, id, employeeData);

    // Re-fetch the updated doc to return fresh data
    const updatedDoc = await firestoreRepo.getDocumentById(COLLECTION, id);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Employee;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Delete an employee by ID.
 * @param {string} id - The Firestore doc ID of the employee
 * @returns {Promise<void>}
 * @throws {RepositoryError} If the employee with the given ID is not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    // Check if doc exists
    await firestoreRepo.getDocumentById(COLLECTION, id);

    // Delete doc
    await firestoreRepo.deleteDocument(COLLECTION, id);
  } catch (error) {
    throw error;
  }
};