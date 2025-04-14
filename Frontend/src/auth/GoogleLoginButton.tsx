import { OAuthProvider } from "appwrite";
import { account } from "../services/OAuth/appWrite";

export const handleLoginGoogle = () => {
    // const success = 'http://localhost:5173/';
    const success = 'http://localhost:5173/oauth-success';
    const failure = 'http://localhost:5173/login';
    account.createOAuth2Session(OAuthProvider.Google, success, failure);
}