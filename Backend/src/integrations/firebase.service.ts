import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string);
const serviceAccountTyped = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountTyped),
});

export const sendPushNotification = async (
  token: string,
  title: string,
  body: string,
) => {
  const message = {
    notification: { title, body },
    token,
  };

  try {
    await admin.messaging().send(message);
    console.log("Push notification send successfully");
  } catch (error) {
    console.log("Error sending push notification:", error);
  }
};
