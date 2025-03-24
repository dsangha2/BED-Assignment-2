/**
 * Branch Service (branchService.ts)
 *
 * Replaces in-memory array with Firestore calls via a repository.
 */
import { RepositoryError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as firestoreRepo from "../repositories/firestoreRepository";

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

// The Firestore collection name for branches
const COLLECTION = "branches";

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const snapshot = await firestoreRepo.getDocuments(COLLECTION);

    // Convert each Firestore doc to a Branch
    const branches: Branch[] = [];
    snapshot.forEach((doc) => {
      branches.push({ id: doc.id, ...doc.data() } as Branch);
    });
    return branches;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Create a new branch.
 * @param {Omit<Branch, "id">} branchData - Branch details without an ID
 * @returns {Promise<Branch>}
 */
export const createBranch = async (
  branchData: Omit<Branch, "id">
): Promise<Branch> => {
  try {
    const docId = await firestoreRepo.createDocument<Branch>(COLLECTION, branchData);
    return { id: docId, ...branchData };
  } catch (error) {
    throw error;
  }
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update
 * @param {Partial<Omit<Branch, "id">>} branchData - Updated fields
 * @returns {Promise<Branch>}
 */
export const updateBranch = async (
  id: string,
  branchData: Partial<Omit<Branch, "id">>
): Promise<Branch> => {
  try {
    await firestoreRepo.getDocumentById(COLLECTION, id);

    await firestoreRepo.updateDocument<Branch>(COLLECTION, id, branchData);

    const updatedDoc = await firestoreRepo.getDocumentById(COLLECTION, id);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Branch;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Delete a branch by ID.
 * @param {string} id - The ID of the branch
 * @returns {Promise<void>}
 */
export const deleteBranch = async (id: string): Promise<void> => {
  try {
    // Check if doc exists
    await firestoreRepo.getDocumentById(COLLECTION, id);

    // Now delete
    await firestoreRepo.deleteDocument(COLLECTION, id);
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get a branch by ID.
 * @param {string} id - The ID of the branch
 * @returns {Promise<Branch>}
 */
export const getBranchById = async (id: string): Promise<Branch> => {
  try {
    const docSnap = await firestoreRepo.getDocumentById(COLLECTION, id);
    return { id: docSnap.id, ...docSnap.data() } as Branch;
  } catch (error) {
    throw error;
  }
};