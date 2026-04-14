import { EmailData, EmailResponse } from "../model/Email";
import httpService from "./http-service";

export const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
  try {
    const response = await httpService.post("/email/send", data);
    return response.data as EmailResponse;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
};
