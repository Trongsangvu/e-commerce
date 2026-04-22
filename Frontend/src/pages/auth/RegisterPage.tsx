import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AddressIcon, EyeSlashIcon } from "../../assets/images/icons/icons";
import images from "../../assets/images/images";
import { ROUTES } from "../../config/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { RootStore } from "../../redux/store";
import { register } from "../../redux/auth/auth.thunk";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootStore) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Form submit events
  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ name, email, password }))
      .then(() => console.log("Register action dispatched"))
      .catch((error) =>
        console.log("Error dispatching register action: ", error),
      );

    navigate(ROUTES.login);
  };

  return (
    <div className="flex flex-col min-h-screen mt-30">
      <main className="grow min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <form
            action=""
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center p-10 mt-20"
          >
            <h3 className="text-black text-center uppercase text-3xl mb-30 font-[GucciSansPro-book]">
              Continue with your email address
            </h3>
            <div className="relative flex flex-col mb-50 max-w-450">
              <label
                htmlFor="name"
                className="mb-10 text-[#838383] text-xs font-[GucciSansPro-light]"
              >
                *Required field
              </label>
              <input
                className="peer font-[GucciSansPro-light] text-sm text-[#666] bg-white h-56 w-328 p-10 border border-solid border-[#1b1b1b]"
                type="text"
                placeholder=" "
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="name"
                className="absolute left-10 font-[GucciSansPro-light] uppercase top-[5%] -translate-y-[5%] text-sm text-[#666] transition-all
                  peer-placeholder-shown:top-1/2
                  peer-placeholder-shown:text-sm 
                  peer-placeholder-shown:text-[#666] 
                  peer-focus:top-32 peer-focus:text-xs peer-focus:text-[#666]
                  peer-not-placeholder-shown:top-32 peer-not-placeholder-shown:text-xs"
              >
                username*
              </label>
              <span className="w-15 absolute top-[59%] right-20">
                <img src={images.pencilIcon} alt="pencilIcon" />
              </span>
            </div>
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
                type="text"
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
                  peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#666]
                  peer-not-placeholder-shown:top-3.5 peer-not-placeholder-shown:text-xs"
              >
                create password*
              </label>
              <span className="w-15 absolute bottom-[35%] right-20">
                <EyeSlashIcon />
              </span>
            </div>
            <div className="w-328 flex flex-col items-center p-10 mb-5">
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
            <div className="bg-[#1a1a1a] w-328 uppercase flex items-center justify-center h-56 text-white cursor-pointer text-center p-10 font-[GucciSansPro-medium]">
              <button type="submit" className="uppercase cursor-pointer">
                create my profile
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className="pb-70 text-center flex flex-col items-center">
          <h2 className="font-[GucciSansPro-book] text-[30px] text-black mb-32">
            JOIN MY COZASTORE
          </h2>
          <div>
            <div className="grid grid-cols-3 gap-6">
              <div className="max-w-380 px-36">
                <h3 className="font-[GucciSansPro-bold] mb-12 text-black">
                  TRACK YOUR ORDERS
                </h3>
                <p className="font-[GucciSansPro-light]">
                  Follow your orders every step of the way.
                </p>
              </div>
              <div className="max-w-380 px-36">
                <h3 className="font-[GucciSansPro-bold] mb-12 text-black">
                  STREAMLINE CHECKOUT
                </h3>
                <p className="font-[GucciSansPro-light]">
                  Check out faster with saved addresses and payment methods.
                </p>
              </div>
              <div className="max-w-380 px-36">
                <h3 className="font-[GucciSansPro-bold] mb-12 text-black">
                  BOOK AN APPOINTMENT
                </h3>
                <p className="font-[GucciSansPro-light]">
                  Enjoy priority access to the boutique of your choice at the
                  time and date that suits you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
