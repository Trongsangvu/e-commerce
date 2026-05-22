import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddressIcon, EyeSlashIcon, GoogleIcon } from "../../assets/images/icons/icons";
import { handleLoginGoogle } from "../../auth/google-auth";
import { LOGIN_ITEMS } from "../../config/constants";
import { routes } from "../../config/routes";
import { useAppDispatch } from "../../hooks/use-redux";
import { setAuth } from "../../redux/auth/auth-helper";
import { checkAuth } from "../../redux/auth/auth-slice";
import { login as loginService } from "../../services/auth-service";
import { toastErrorMessage } from "../../utils/error-util";
import images from "../../assets/images/images";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginService({ email, password });
      setAuth(res.token, res.user);
      dispatch(checkAuth());
      navigate(routes.home);
    } catch (error) {
      toast.error(toastErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-[#fefcf8] flex flex-col">
      <div className="h-72 border-b border-[#e8e1d5] flex items-center justify-center shrink-0">
        <Link to={routes.home} className="no-underline">
          <span
            className="text-[#0f0e0c] tracking-[0.22em] uppercase"
            style={{ ...serif, fontSize: "1.5rem", fontWeight: 300 }}
          >
            COZASTORE
          </span>
        </Link>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="hidden lg:flex w-[45%] bg-[#0f0e0c] flex-col items-center justify-end pb-16 relative overflow-hidden shrink-0">
          <img
            src={images.detailBanner}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Fashion banner"
          />

          <div className="relative text-center px-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="block w-10 h-px bg-[#b5854a]" />
              <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[#b5854a]">Welcome Back</span>
              <span className="block w-10 h-px bg-[#b5854a]" />
            </div>
            <h2
              className="text-[#fefcf8] font-light leading-[1.05] mb-6"
              style={{ ...serif, fontSize: "clamp(2rem,3vw,3rem)" }}
            >
              Your style,<br />
              <em className="italic text-[#d4a96a]">your world.</em>
            </h2>
            <p className="text-[0.82rem] leading-[1.8] text-white/45 max-w-280 mx-auto">
              Sign in to access your orders, wishlist, and personalized recommendations.
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 overflow-y-auto">
          <div className="w-full max-w-400">
            <div className="text-center mb-20">
              <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#b5854a] mb-10">
                Welcome Back
              </p>
              <h1
                className="text-[#0f0e0c] font-light leading-[1.1] mb-2"
                style={{ ...serif, fontSize: "clamp(1.8rem,2.5vw,2.4rem)" }}
              >
                Sign In
              </h1>
              <p className="text-[0.82rem] text-[#8a8278]">Continue with your email address</p>
            </div>

            <button
              type="button"
              onClick={handleLoginGoogle}
              className="w-full rounded-xl flex items-center justify-center gap-12 border border-[#e8e1d5] py-14 mb-32 text-[0.75rem] tracking-widest uppercase text-[#0f0e0c] bg-transparent cursor-pointer hover:border-[#0f0e0c] transition-colors duration-200 font-inherit"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[#e8e1d5]" />
              <span className="text-[0.72rem] tracking-widest uppercase text-[#c2b9a8]">or</span>
              <div className="flex-1 h-px bg-[#e8e1d5]" />
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-20">
              <div className="relative">
                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#8a8278] mb-6">
                  Email *
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#e8e1d5] bg-[#fefcf8] px-16 py-14 pr-10 text-[0.85rem] rounded-sm text-[#0f0e0c] outline-none placeholder:text-[#c2b9a8] focus:border-[#b5854a] transition-colors duration-200"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c2b9a8] pointer-events-none">
                    <AddressIcon />
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-[#8a8278]">
                    Password *
                  </label>
                  <a href="#" className="text-[0.65rem] tracking-[0.08em] text-[#b5854a] no-underline hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#e8e1d5] bg-[#fefcf8] px-16 py-14 pr-40 rounded-sm text-[0.85rem] text-[#0f0e0c] outline-none placeholder:text-[#c2b9a8] focus:border-[#b5854a] transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#c2b9a8] hover:text-[#8a8278] transition-colors p-0 flex items-center"
                  >
                    <EyeSlashIcon />
                  </button>
                </div>
              </div>

              <p className="text-[0.75rem] leading-[1.7] text-[#8a8278]">
                By choosing "Create my profile", you confirm that you agree to our{" "}
                <a href="#" className="text-[#0f0e0c] underline underline-offset-2 hover:text-[#b5854a] transition-colors">
                  Terms of use
                </a>{" "}
                , that you have acknowledged our{" "}
                <a href="#" className="text-[#0f0e0c] underline underline-offset-2 hover:text-[#b5854a] transition-colors">
                  privacy policy
                </a>{" "}
                , and that you want to create your COZA profile.
              </p>

              <button
                type="submit"
                className="w-full py-16 bg-[#0f0e0c] text-[#fefcf8] text-[0.78rem] rounded-sm tracking-[0.18em] uppercase border-none cursor-pointer font-inherit hover:bg-[#b5854a] transition-colors duration-300"
              >
                Sign In
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#e8e1d5]" />
                <span className="text-[0.72rem] tracking-widest uppercase text-[#c2b9a8]">or</span>
                <div className="flex-1 h-px bg-[#e8e1d5]" />
              </div>

              <Link
                to={routes.register}
                className="w-full flex items-center justify-center py-16 rounded-sm border border-[#0f0e0c] text-[#0f0e0c] text-[0.78rem] tracking-[0.18em] uppercase no-underline hover:bg-[#0f0e0c] hover:text-[#fefcf8] transition-colors duration-300"
              >
                Sign Up
              </Link>
            </form>
          </div>

          <div className="w-full max-w-680 mt-40 pt-48 border-t border-[#e8e1d5]">
            <div className="text-center mb-40">
              <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#b5854a] mb-2">Benefits</p>
              <h2
                className="text-[#0f0e0c] font-light"
                style={{ ...serif, fontSize: "1.75rem" }}
              >
                Join My CozaStore
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-32 text-center">
              {LOGIN_ITEMS.map(({ icon: Icon, title, desc }) => (
                <div key={title}>
                  <div className="w-40 h-40 border border-[#e8e1d5] flex items-center justify-center text-[#b5854a] mx-auto mb-16">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#0f0e0c] font-medium mb-2">{title}</p>
                  <p className="text-[0.8rem] leading-[1.7] text-[#8a8278]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;