import twilio from "twilio";
import { CONSTANTS } from "./../configs/constants";

const client = twilio(CONSTANTS.TWILIO_ACC_SID, CONSTANTS.TWILIO_AUTH_TOKEN);

export const sendOrderNotification = async (phone: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      from: CONSTANTS.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log("SMS sent successfully");
  } catch (error) {
    console.log("Error sending SMS:", error);
  }
};
