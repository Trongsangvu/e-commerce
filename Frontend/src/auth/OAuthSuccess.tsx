import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { account } from "../services/OAuth/appWrite";
import { oauthLogin } from "../redux/auth/authAction";
import { getToken } from "./authToken";


export const OAuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const processAuth = async () => {
            try {
                const session = await account.getSession('current');
                if (session) {
                    const user = await account.get();
                    console.log("User from Appwrite:", user);
                    console.log('username: ', user.name);

                    // Prepare data for oauthLogin
                    const userData = {
                        $id: user.$id,
                        name: user.name,
                        email: user.email // Check if email exists
                    }

                    // Check if there is email
                    if (!userData.email) {
                        console.error("Email is missing in the user object.");
                        return;
                    }

                    const response = await dispatch(oauthLogin(userData)).unwrap();
                    console.log('Logged in successfully: ', response);

                    // Save the token in local storage
                    if (response && response.token) {
                        localStorage.setItem('token', response.token);
                        console.log("Token in localStorage:", getToken());
                        navigate('/profile');
                    }
                } else {
                    console.log('No session after Google login');
                }
            } catch (error) {
                console.error('Error during Google login: ', error);
            }
        } 

        processAuth();
    }, []);

    return <p>Progress in login...</p>
};