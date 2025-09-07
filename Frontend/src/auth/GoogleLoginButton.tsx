import { OAuthProvider } from "appwrite";
import { account } from "../services/OAuth/appWrite";

export const handleLoginGoogle = async () => {
  // const success = 'http://localhost:5173/';
  const success = "http://localhost:5173/oauth-success";
  const failure = "http://localhost:5173/login";

  try {
    await account.deleteSession("current");
    console.log("session cũ đã bị xóa, bắt đầu quy trình OAuth");

    await account.createOAuth2Session(OAuthProvider.Google, success, failure);
  } catch (err) {
    console.log("No session to delete before login", err);
  }
};
