import { Models, OAuthProvider } from "appwrite";
import { ROUTES } from "../config/routes";
import { oauthLogin } from "../redux/auth/auth.thunk";
import { AppDispatch } from "../redux/store";
import { account } from "../services/appwrite-service";

const initiateOAuthLogin = async (provider: OAuthProvider) => {
  try {
    const success = "http://localhost:5173/"; // URL to redirect on success
    const failure = "http://localhost:5173/login"; // URL to redirect on failure

    // Start the OAuth session
    await account.createOAuth2Session(provider, success, failure);
    return true;
  } catch (error) {
    console.error(`Failed to initiate ${provider} login:`, error);
    return false;
  }
};

// Process the OAuth session after successful authentication
const processOAuthSession = async () => {
  try {
    const session = await account.getSession("current");
    if (!session) {
      console.log("No active session found");
      return null;
    }
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Failed to process session:", error);
    return null;
  }
};

type AppWriteUser = Models.User<Models.Preferences>;
// Handle successful login by dispatching Redux action and storing token
const handleLoginSuccess = async (
  user: AppWriteUser,
  dispatch: AppDispatch,
  navigate: (path: string) => void,
) => {
  try {
    const response = await dispatch(oauthLogin(user)).unwrap();

    if (response && response.token) {
      localStorage.setItem("token", response.token);
      navigate(ROUTES.account);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to complete login process:", error);
    return false;
  }
};

// Main login handler that coordinates the entire flow
export const handleLoginWithGoogle = async (
  dispatch: AppDispatch,
  navigate: (path: string) => void,
) => {
  try {
    // Step 1: Initiate OAuth
    const initiated = await initiateOAuthLogin(OAuthProvider.Google);
    if (!initiated) return;

    // Step 2: Process session
    const user = await processOAuthSession();
    if (!user) return;

    // Step 3: Handle login success
    await handleLoginSuccess(user, dispatch, navigate);
  } catch (error) {
    console.error("Google login process failed:", error);
  }
};
