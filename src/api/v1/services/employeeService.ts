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

/**
 * @description Create a new employee.
 * @param {{ name: string; position: string; department: string; email: string; phone: string; branchId: number; }} employeeData
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (employeeData: {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}): Promise<Employee> => {
  const newEmployee: Employee = {
    id: Date.now().toString(), // using timestamp as unique id
    ...employeeData,
  };

  employees.push(newEmployee);
  return newEmployee;
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {{ name?: string; position?: string; department?: string; email?: string; phone?: string; branchId?: number; }} employeeData
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
  id: string,
  employeeData: {
    name?: string;
    position?: string;
    department?: string;
    email?: string;
    phone?: string;
    branchId?: number;
  }
): Promise<Employee> => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  employees[index] = { ...employees[index], ...employeeData };
  return employees[index];
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  employees.splice(index, 1);
};