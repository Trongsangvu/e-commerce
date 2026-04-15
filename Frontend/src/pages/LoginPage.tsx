import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AddressIcon,
  EyeSlashIcon,
  GoogleIcon,
} from "../assets/images/icons/icons";
import { handleLoginGoogle } from "../auth/GoogleLoginButton";
import { Footer } from "../components/navigation/Footer";
import config from "../config/config";
import { login } from "../redux/actions/auth-action";
import { AppDispatch, RootStore } from "../redux/store";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error } = useSelector((state: RootStore) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle Form submit events
  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .then(() => console.log("Login action dispatched"))
      .catch((error) => console.log("Error dispatching login action: ", error));

    navigate(config.ROUTES.home);
  };

  return (
    <div className="flex flex-col min-h-screen mt-30">
      <main className="grow min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <div
            className="bg-white w-82 mt-90 mb-5 border border-[#1a1a1a] uppercase flex items-center justify-center h-14 text-black cursor-pointer text-center p-2.5 font-[GucciSansPro-medium]"
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
            className="flex flex-col items-center p-10 mt-5"
          >
            <h3 className="text-black text-center uppercase text-3xl mb-30 font-[GucciSansPro-book]">
              Continue with your email address
            </h3>
            <div className="relative flex flex-col mb-12.5 max-w-112.5">
              <input
                className="peer font-[GucciSansPro-light] text-sm text-[#666] bg-white h-14 w-82 p-2.5 border border-solid border-[#1b1b1b]"
                type="text"
                placeholder=" "
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-2.5 font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                            peer-placeholder-shown:top-1/2 
                            peer-placeholder-shown:text-sm 
                            peer-placeholder-shown:text-[#666] 
                            peer-focus:top-3.25 peer-focus:text-xs peer-focus:text-[#666]
                            peer-not-placeholder-shown:top-3.25 peer-not-placeholder-shown:text-xs"
              >
                email*
              </label>
              <span className="w-3.75 absolute top-[39%] right-5">
                <AddressIcon />
              </span>
            </div>

            <div className="relative flex flex-col mb-12.5 max-w-112.5">
              <input
                className="peer font-[GucciSansPro-light] flex items-center text-sm text-[#666] h-14 w-82 bg-white p-2.5 border border-solid border-[#1b1b1b]"
                type="text"
                placeholder=" "
                id="password"
                value={password.toString()}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-2.5 font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                            peer-placeholder-shown:top-1/2 
                            peer-placeholder-shown:text-sm 
                            peer-placeholder-shown:text-[#666] 
                            peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#666]
                            peer-not-placeholder-shown:top-3.5 peer-not-placeholder-shown:text-xs"
              >
                password*
              </label>
              <span className="w-3.75 absolute bottom-[35%] right-5">
                <EyeSlashIcon />
              </span>
            </div>
            <div className="w-82 flex flex-col items-center p-10 mb-5">
              <p className="text-justify font-[GucciSansPro-light] text-[#666] text-sm">
                By choosing "Create my profile", you confirm that you agree to
                our
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
            <div className="bg-[#1a1a1a] w-82 uppercase flex items-center justify-center h-14 text-white cursor-pointer text-center p-2.5 font-[GucciSansPro-medium]">
              <button type="submit" className="uppercase cursor-pointer">
                sign in
              </button>
            </div>
            <span className="font-[GucciSansPro-book] uppercase my-10 text-xl">
              or
            </span>
            <div className="bg-[#1a1a1a] w-82 uppercase flex items-center justify-center h-14 text-white cursor-pointer text-center p-2.5 font-[GucciSansPro-medium]">
              <Link to={config.ROUTES.register}>
                <button className="uppercase cursor-pointer">sign up</button>
              </Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className="pb-17.5 text-center flex flex-col items-center">
          <h2 className=" font-[GucciSansPro-book] text-[30px] text-black mb-8">
            JOIN MY COZASTORE
          </h2>
          <div>
            <div className="grid grid-cols-3 gap-6">
              <div className="max-w-95 px-9">
                <h3 className=" font-[GucciSansPro-bold] mb-12 text-black">
                  TRACK YOUR ORDERS
                </h3>
                <p className=" font-[GucciSansPro-light]">
                  Follow your orders every step of the way.
                </p>
              </div>
              <div className="max-w-95 px-9">
                <h3 className=" font-[GucciSansPro-bold] mb-12 text-black">
                  STREAMLINE CHECKOUT
                </h3>
                <p className=" font-[GucciSansPro-light]">
                  Check out faster with saved addresses and payment methods.
                </p>
              </div>
              <div className="max-w-95 px-9">
                <h3 className=" font-[GucciSansPro-bold] mb-12 text-black">
                  BOOK AN APPOINTMENT
                </h3>
                <p className=" font-[GucciSansPro-light]">
                  Enjoy priority access to the boutique of your choice at the
                  time and date that suits you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
