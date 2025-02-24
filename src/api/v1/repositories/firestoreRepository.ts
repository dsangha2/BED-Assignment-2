import db from "../../../../config/firebaseConfig";
import { RepositoryError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { getErrorMessage, getErrorCode, getFirebaseErrorStatusCode } from "../utils/errorUtils";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

/**
 * Allowed Firestore data types (for stricter type safety).
 */
type FirestoreDataTypes = string | number | boolean | null | Timestamp | FieldValue;

/**
 * Represents a field-value pair for queries.
 */
interface FieldValuePair {
  fieldName: string;
  fieldValue: FirestoreDataTypes;
}

/**
 * Runs a Firestore transaction with the given operations.
 */
export const runTransaction = async <T>(
  operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
  try {
    return await db.runTransaction(operations);
  } catch (error: unknown) {
    // Example of throwing a custom RepositoryError
    throw new RepositoryError(
      `Transaction failed: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};

/**
 * Creates a new document in the specified Firestore collection.
 */
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  try {
    let docRef: FirebaseFirestore.DocumentReference;
    if (id) {
      docRef = db.collection(collectionName).doc(id);
      await docRef.set(data);
    } else {
      docRef = await db.collection(collectionName).add(data);
    }
    return docRef.id;
  } catch (error: unknown) {
    throw new RepositoryError(
      `Failed to create document in ${collectionName}: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};

/**
 * Retrieves all documents from a collection.
 */
export const getDocuments = async (
  collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
  try {
    return await db.collection(collectionName).get();
  } catch (error: unknown) {
    throw new RepositoryError(
      `Failed to fetch documents from ${collectionName}: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};

/**
 * Retrieves a document by ID.
 */
export const getDocumentById = async (
  collectionName: string,
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot> => {
  try {
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new RepositoryError(
        `Document not found in ${collectionName} with id ${id}`,
        "DOC_NOT_FOUND",
        HTTP_STATUS.NOT_FOUND
      );
    }
    return doc;
  } catch (error: unknown) {
    if (error instanceof RepositoryError) throw error;
    throw new RepositoryError(
      `Failed to fetch document ${id} from ${collectionName}: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};

/**
 * Updates an existing document in a collection.
 */
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).update(data);
  } catch (error: unknown) {
    throw new RepositoryError(
      `Failed to update document ${id} in ${collectionName}: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};

/**
 * Deletes a specific document from a collection.
 */
export const deleteDocument = async (
  collectionName: string,
  id: string,
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    const docRef = db.collection(collectionName).doc(id);
    if (transaction) {
      transaction.delete(docRef);
    } else {
      await docRef.delete();
    }
  } catch (error: unknown) {
    throw new RepositoryError(
      `Failed to delete document ${id} from ${collectionName}: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};

/**
 * Deletes multiple documents matching specific field-value pairs.
 */
export const deleteDocumentsByFieldValues = async (
  collectionName: string,
  fieldValuePairs: FieldValuePair[],
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    let query: FirebaseFirestore.Query = db.collection(collectionName);
    // Apply filters
    fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
      query = query.where(fieldName, "==", fieldValue);
    });

    let snapshot: FirebaseFirestore.QuerySnapshot;

    if (transaction) {
      snapshot = await transaction.get(query);
      snapshot.docs.forEach((doc) => {
        transaction.delete(doc.ref);
      });
    } else {
      snapshot = await query.get();
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
  } catch (error: unknown) {
    throw new RepositoryError(
      `Failed to delete documents from ${collectionName} by field-value pairs: ${getErrorMessage(error)}`,
      getErrorCode(error),
      getFirebaseErrorStatusCode(error)
    );
  }
};
