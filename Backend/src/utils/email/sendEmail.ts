import { google } from 'googleapis';
import { oauth2Client } from '../../config/OAuth/OAuth2';

export const sendEmail = async (to: string, subject: string, message: string) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const emailContent = [
            `To: ${to}`,
            `subject: ${subject}`,
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=utf-8",,
            "",
            message
        ].join("\n");

        const encodedEmail = Buffer.from(emailContent).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

        const response = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedEmail
            }
        });
        return response.data;
    } catch(error) {
        console.error("Error sending email: ", error);
        throw error;
    }
}