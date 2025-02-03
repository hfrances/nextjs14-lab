import admin from "firebase-admin"; // Importa desde firebase-admin/firestore
import { cert, initializeApp } from "firebase-admin/app"; // Importa desde firebase-admin/firestore
import serviceAccountKey from './serviceAccountKey.json';

/*const serviceAccountKey = {
  type: "service_account",  
  project_id: "YOUR_PROJECT_ID",
  private_key_id: "YOUR_PRIVATE_KEY_ID",
  private_key: "YOUR_PRIVATE_KEY",
  client_email: "YOUR_CLIENT_EMAIL",
  client_id: "YOUR_CLIENT_ID",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nextjs-poc-serveractions.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}
;*/

const app =
  admin.apps.find(app => app) ?? initializeApp({
    credential: cert({
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email,
      privateKey: serviceAccountKey.private_key,
    })
  });

export const db = admin.firestore(app); // Obtén una referencia a Firestore
