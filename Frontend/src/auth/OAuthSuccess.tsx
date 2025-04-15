import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { account } from "../services/OAuth/appWrite";
import { oauthLogin } from "../redux/auth/authAction";
// import { getToken } from "./authToken";
import { setUser } from "../redux/user/userSlice";

export const OAuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const processAuth = async () => {
            try {
                const session = await account.getSession('current');
                if (!session) {
                    console.warn("No session found");
                    navigate('/login'); 
                    return;
                } 
                
                // const allowedEmails = ["vusangtrong58@gmail.com"];
                const user = await account.get();
                console.log("User from Appwrite:", user);

                // if (!allowedEmails.includes(user.email)) {
                //     await account.deleteSession('current');
                //     alert("Vui lòng đăng nhập bằng tài khoản được cho phép");
                //     navigate('/login');
                //     return;
                // }

                const response = await dispatch(oauthLogin({
                    $id: user.$id,
                    name: user.name,
                    email: user.email
                })).unwrap(); // This will automatically extract and type the payload

                    // Access payload here, not `data`
                const { token, user: userData } = response;
                
                // Store token and user data in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                // Dispatch user data
                dispatch(setUser(userData));

                // Navigate to profile page
                navigate('/profile');
            } catch (error) {
                console.error('Error during Google login: ', error);
                // navigate('/login');
            }
        }
        processAuth();
    }, [dispatch, navigate]);

    return <p>Progress in login...</p>
};

// Prepare data for oauthLogin
                    // const userData = {
                    //     $id: user.$id,
                    //     name: user.name,
                    //     email: user.email // Check if email exists
                    // }
                    

                    // Check if there is email
                    // if (!userData.email) {
                    //     console.error("Email is missing in the user object.");
                    //     return;
                    // }

                    // const response = await dispatch(oauthLogin(userData)).unwrap();
                    // console.log('Logged in successfully: ', response);

                    // Save the token in local storage
                    // if (response && response.token) {
                    //     localStorage.setItem('token', response.token);
                    //     console.log("Token in localStorage:", getToken());
                    //     navigate('/profile'); 
                    // }