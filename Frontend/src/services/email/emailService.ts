import HttpService from "../../api/HttpService";
import { EmailData, EmailResponse } from "../../model/Email";

export const sendEmail = async (data: EmailData): Promise<EmailResponse> => {
    try {
        const response = await HttpService.post("/email/send", data);
        return response.data as EmailResponse;
    }
    catch(error) {
        throw new Error(`Failed to send email: ${error}`);
    }
}