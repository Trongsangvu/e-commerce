import admin from "../config/firebase/firebase";

export const sendPushNotification = async (
  token: string,
  title: string,
  body: string
) => {
  const message = {
    notification: { title, body },
    token,
  };

  try {
    await admin.messaging().send(message);
    console.log("Push notification send successfully");
  } catch (error) {
    console.log("Error sending push notificaiton:", error);
  }
};
