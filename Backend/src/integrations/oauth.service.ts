import { google } from "googleapis";
import { CONSTANTS } from './../configs/constants';

const CLIENT_ID = CONSTANTS.CLIENT_ID;
const CLIENT_SECRET = CONSTANTS.CLIENT_SECRET;
const REDIRECT_URI = CONSTANTS.REDIRECT_URI;
const REFRESH_TOKEN = CONSTANTS.REFRESH_TOKEN;

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
