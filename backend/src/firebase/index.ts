import * as admin from 'firebase-admin';
import { serviceAccounKey } from '../config/serviceAccountKey';

// Initialize Firebase
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccounKey as admin.ServiceAccount),
});

// Initialize Firebase Admin authentication reference
export const adminFireAuth = adminApp.auth();
