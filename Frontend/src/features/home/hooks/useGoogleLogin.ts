// import { useEffect, useState } from "react";
import { account } from "../../../services/OAuth/appWrite";
import { OAuthProvider, Models } from "appwrite";
// import { useDispatch } from "react-redux";
import { oauthLogin } from "../../../redux/auth/authAction";
// import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";

// export const useGoogleLogin = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const navigate = useNavigate();
//     const [userName, setUserName] = useState('');
//     const handleLoginWithGoogle = async () =>{
//         try {
//             const success = 'http://localhost:5173/'; // URL to redirect on success
//             const failure = 'http://localhost:5173/login'; // URL to redirect on failure
  
//             account.createOAuth2Session(OAuthProvider.Google, success, failure);
//         }
//         catch(error) {
//             console.error('Google login failed: ', error);
//         }
//     }

//     const fetchUserAfterRedirect = async () => {
//         try {
//              // Get current session after successful login
//              const session = await account.getSession('current');
//              if (session) {
//                 const user = await account.get();
//                 setUserName(user.name);

//                 console.log('Tên người dùng:', user.name); 
 
//                 const response = await dispatch(oauthLogin(user)).unwrap();
//                 console.log('Logged in with Google: ', response);
 
//                  // Save the token in LocalStorage
//                 if (response.token) {
//                     localStorage.setItem('token', response.token);
//                     // Redirect 
//                     navigate('/profile');
//                 }
 
//              } else {
//                  console.log('No session after Google login');}
//         } catch(error) {
//             console.error('Error fetching user after Google login: ', error);
//         }
//     } 

//     useEffect(() => {
//         fetchUserAfterRedirect();
//     }, []);

//     return { handleLoginWithGoogle, userName }; // userName
// }
// Initiate the OAuth login process with a provider


const initiateOAuthLogin = async (provider: OAuthProvider) => {
    try {
      const success = 'http://localhost:5173/'; // URL to redirect on success
      const failure = 'http://localhost:5173/login'; // URL to redirect on failure
      
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
      const session = await account.getSession('current');
      if (!session) {
        console.log('No active session found');
        return null;
      }
      
      const user = await account.get();
      console.log('User name:', user.name);
      return user;
    } catch (error) {
      console.error('Failed to process session:', error);
      return null;
    }
  };
  
  type AppwriteUser = Models.User<Models.Preferences>;
  // Handle successful login by dispatching Redux action and storing token
const handleLoginSuccess = async (user: AppwriteUser, dispatch: AppDispatch, navigate: (path: string) => void) => {
    try {
      const response = await dispatch(oauthLogin(user)).unwrap();
      console.log('Login successful:', response);
      
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        navigate('/profile');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to complete login process:', error);
      return false;
    }
  };
  
  // Main login handler that coordinates the entire flow
export const handleLoginWithGoogle = async (dispatch: AppDispatch, navigate: (path: string) => void) => {
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
      console.error('Google login process failed:', error);
      // You could implement additional error handling here
      // For example, showing an error message to the user
    }
  };
  
  // Example usage:
  // In your component:
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // 
  // <button onClick={() => handleLoginWithGoogle(dispatch, navigate)}>
  //   Login with Google
  // </button>