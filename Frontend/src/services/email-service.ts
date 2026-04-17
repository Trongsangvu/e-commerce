import emailEndpoints from "../api/email.api";
import { EmailData, EmailResponse } from "../types/email-type";
import httpService from "./http-service";

export const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
  const res = await httpService.post<EmailResponse, EmailData>(
    emailEndpoints.sendEmail,
    data,
  );

  return res.data;
};
