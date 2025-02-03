/**
 * Branch Service (branchService.ts)
 *
 * This file defines functions (services) for managing branch data.
 * These functions store branch data in-memory but could be extended
 * to use a persistent database.
 */

export type Branch = {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
  
  const branches: Branch[] = [];
  
  /**
   * @description Get all branches.
   * @returns {Promise<Branch[]>}
   */
  export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
  };
  
  /**
   * @description Create a new branch.
   * @param {{ name: string; address: string; phone: string; }} branchData - The branch details.
   * @returns {Promise<Branch>}
   */
  export const createBranch = async (branchData: {
    name: string;
    address: string;
    phone: string;
  }): Promise<Branch> => {
    const newBranch: Branch = {
      id: Date.now().toString(), // Simple unique ID using timestamp
      ...branchData,
    };
    branches.push(newBranch);
    return newBranch;
  };
  
  /**
   * @description Update an existing branch.
   * @param {string} id - The ID of the branch to update.
   * @param {{ name?: string; address?: string; phone?: string; }} branchData - The updated branch details.
   * @returns {Promise<Branch>}
   * @throws {Error} If the branch with the given ID is not found.
   */
  export const updateBranch = async (
    id: string,
    branchData: { name?: string; address?: string; phone?: string }
  ): Promise<Branch> => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
      throw new Error(`Branch with ID ${id} not found`);
    }
    branches[index] = { ...branches[index], ...branchData };
    return branches[index];
  };
  
  /**
   * @description Delete a branch.
   * @param {string} id - The ID of the branch to delete.
   * @returns {Promise<void>}
   * @throws {Error} If the branch with the given ID is not found.
   */
  export const deleteBranch = async (id: string): Promise<void> => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
      throw new Error(`Branch with ID ${id} not found`);
    }
    branches.splice(index, 1);
  };
  
  /**
   * @description Get a branch by ID.
   * @param {string} id - The ID of the branch to retrieve.
   * @returns {Promise<Branch>}
   * @throws {Error} If the branch with the given ID is not found.
   */
  export const getBranchById = async (id: string): Promise<Branch> => {
    const branch = branches.find(branch => branch.id === id);
    if (!branch) {
      throw new Error(`Branch with ID ${id} not found`);
    }
    return branch;
  };
  