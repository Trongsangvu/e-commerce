export interface EmailData {
    to: string;
    subject?: string;
    html?: string;
}

export interface EmailResponse {
    success: boolean;
    message: string;
}