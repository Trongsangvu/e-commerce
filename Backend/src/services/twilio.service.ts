import { client } from '../config/twillio/twilio';

export const sendOrderNotification = async (phone: string, message: string) => {
    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });
        console.log('SMS sent successfully')
    }
    catch(error) {
        console.log('Error sending SMS:', error);
    }
}