import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../config/routes";
import { oauthLogin } from "../redux/auth/auth-thunk";
import { AppDispatch } from "../redux/store";
import { setUser } from "../redux/user/user-slice";
import { account } from "../services/appwrite-service";

export const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const session = await account.getSession({
          sessionId: "current",
        });

        if (!session) {
          navigate(routes.login, { replace: true });
          return;
        }

        const user = await account.get();

        const response = await dispatch(
          oauthLogin({
            $id: user.$id,
            name: user.name,
            email: user.email,
          }),
        ).unwrap();

        const { token, user: userData } = response;

        Cookies.set("token", token, { expires: 7 });
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });

        dispatch(setUser(userData));

        navigate(routes.account, { replace: true });
      } catch (error) {
        console.error("Error during Google login:", error);
        navigate(routes.login, { replace: true });
      }
    };

    void processAuth();
  }, [dispatch, navigate]);

  return <p>Processing login...</p>;
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
