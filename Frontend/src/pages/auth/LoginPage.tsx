import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AddressIcon,
  EyeSlashIcon,
  GoogleIcon,
} from "../../assets/images/icons/icons";
import { handleLoginGoogle } from "../../auth/GoogleLoginButton";
import { ROUTES } from "../../config/routes";
import { useAppDispatch } from "../../hooks/use-redux";
import { checkAuth } from "../../redux/auth/auth-slice";
import { setAuth } from "../../redux/auth/auth.helper";
import { login as loginService } from "../../services/auth-service";
import { toast } from "react-toastify";
import { toastErrorMessage } from "../../utils/error.util";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle Form submit events
  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginService({ email, password });
      setAuth(res.token, res.user);
      dispatch(checkAuth());
      navigate(ROUTES.home);
    } catch (error) {
      toast.error(toastErrorMessage(error));
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-30 gap-100">
      <div className="flex flex-col items-center w-full">
        <div
          className="bg-white w-328 mt-90 mb-5 border border-[#1a1a1a] uppercase flex items-center justify-center h-56 text-black cursor-pointer text-center p-2.5 font-[GucciSansPro-medium]"
          onClick={handleLoginGoogle}
        >
          <button
            type="button"
            className="uppercase cursor-pointer flex items-center gap-10"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center p-10 mt-20"
        >
          <h3 className="text-black text-center uppercase text-3xl mb-30 font-[GucciSansPro-book]">
            Continue with your email address
          </h3>
          <div className="relative flex flex-col mb-50 max-w-450">
            <input
              className="peer font-[GucciSansPro-light] text-sm text-[#666] bg-white h-56 w-328 p-10 border border-solid border-[#1b1b1b]"
              type="text"
              placeholder=" "
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute left-10 font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                  peer-placeholder-shown:top-1/2 
                  peer-placeholder-shown:text-sm 
                  peer-placeholder-shown:text-[#666] 
                  peer-focus:top-13 peer-focus:text-xs peer-focus:text-[#666]
                  peer-not-placeholder-shown:top-13 peer-not-placeholder-shown:text-xs"
            >
              email*
            </label>
            <span className="w-15 absolute top-[39%] right-20">
              <AddressIcon />
            </span>
          </div>

          <div className="relative flex flex-col mb-50 max-w-450">
            <input
              className="peer font-[GucciSansPro-light] flex items-center text-sm text-[#666] h-56 w-328 bg-white p-10 border border-solid border-[#1b1b1b]"
              type="password"
              placeholder=" "
              id="password"
              value={password.toString()}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute left-10 font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                  peer-placeholder-shown:top-1/2 
                  peer-placeholder-shown:text-sm 
                  peer-placeholder-shown:text-[#666] 
                  peer-focus:top-14 peer-focus:text-xs peer-focus:text-[#666]
                  peer-not-placeholder-shown:top-14 peer-not-placeholder-shown:text-xs"
            >
              password*
            </label>
            <span className="w-15 absolute bottom-[35%] right-20">
              <EyeSlashIcon />
            </span>
          </div>
          <div className="w-328 flex flex-col items-center p-10 mb-20">
            <p className="text-justify font-[GucciSansPro-light] text-[#666] text-sm">
              By choosing "Create my profile", you confirm that you agree to our
              <a
                href="#"
                className="text-black underline underline-offset-1 pl-2 font-[GucciSansPro-medium]"
              >
                Terms of use
              </a>{" "}
              , that you have acknowledged our
              <a
                href="#"
                className="text-black underline underline-offset-1 pl-2 font-[GucciSansPro-medium]"
              >
                privacy policy
              </a>{" "}
              , and that you want to create your GUCCI profile.
            </p>
          </div>
          <div className="bg-[#1a1a1a] w-328 uppercase flex items-center justify-center h-56 text-white cursor-pointer text-center p-10 font-[GucciSansPro-medium]">
            <button type="submit" className="uppercase cursor-pointer">
              sign in
            </button>
          </div>
          <span className="font-[GucciSansPro-book] uppercase my-10 text-xl">
            or
          </span>
          <div className="bg-[#1a1a1a] w-328 uppercase flex items-center justify-center h-56 text-white cursor-pointer text-center p-10 font-[GucciSansPro-medium]">
            <Link to={ROUTES.register}>
              <button className="uppercase cursor-pointer">sign up</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="pb-70 text-center flex flex-col items-center">
        <h2 className=" font-[GucciSansPro-book] text-[30px] text-black mb-32">
          JOIN MY COZASTORE
        </h2>
        <div>
          <div className="grid grid-cols-3 gap-6">
            <div className="max-w-380 px-36">
              <h3 className=" font-[GucciSansPro-bold] mb-12 text-black">
                TRACK YOUR ORDERS
              </h3>
              <p className=" font-[GucciSansPro-light]">
                Follow your orders every step of the way.
              </p>
            </div>
            <div className="max-w-380 px-36">
              <h3 className=" font-[GucciSansPro-bold] mb-12 text-black">
                STREAMLINE CHECKOUT
              </h3>
              <p className=" font-[GucciSansPro-light]">
                Check out faster with saved addresses and payment methods.
              </p>
            </div>
            <div className="max-w-380 px-36">
              <h3 className=" font-[GucciSansPro-bold] mb-12 text-black">
                BOOK AN APPOINTMENT
              </h3>
              <p className=" font-[GucciSansPro-light]">
                Enjoy priority access to the boutique of your choice at the time
                and date that suits you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
