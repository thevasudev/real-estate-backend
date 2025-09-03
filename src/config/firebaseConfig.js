// const admin = require('firebase-admin');

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(), // uses GOOGLE_APPLICATION_CREDENTIALS
//     storageBucket: process.env.FB_STORAGE_BUCKET
//   });
// }

// const bucket = admin.storage().bucket();
// module.exports = { admin, bucket };


const admin = require("firebase-admin");

// Decode Base64 Service Account JSON
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!serviceAccountBase64) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_BASE64 is missing in environment variables"
  );
}

// Convert Base64 back to JSON
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf8")
);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FB_STORAGE_BUCKET || "gs://real-estate-43720.firebasestorage.app",
  });
}

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };