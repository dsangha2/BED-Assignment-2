/**
 * Employee Service (employeeService.ts)
 *
 * This file defines functions (services) for managing employee data.
 * These functions currently store employees in-memory but could be extended
 * to use a database.
 */

export type Employee = {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
  };
  
  const employees: Employee[] = [];
  
  /**
   * @description Get all employees.
   * @returns {Promise<Employee[]>}
   */
  export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
  };

  /**
 * @description Get an employee by ID.
 * @param {string} id - The ID of the employee to retrieve.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee is not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
  const employee = employees.find(emp => emp.id === id);
  if (!employee) {
    throw new Error(`Employee with ID ${id} not found`);
  }
  return employee;
};