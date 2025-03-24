import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../assignment-03-8e32c-firebase-adminsdk-fbsvc-320ac4859f.json";

// Initialize the Firebase Admin SDK with your service account
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

// Create a Firestore instance
const db: Firestore = getFirestore();

// Export the Firestore instance for use in services/repositories
export default db;
