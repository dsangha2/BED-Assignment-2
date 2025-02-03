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