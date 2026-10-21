import { OAuthProvider } from "appwrite";

import { oauthState } from "../config/constants";
import { account } from "../services/appwrite-service";

export const handleLoginGoogle = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: oauthState.success,
    failure: oauthState.failure,
  });
};