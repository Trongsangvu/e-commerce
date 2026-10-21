import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddressIcon, EyeSlashIcon } from "../../assets/images/icons/icons";
import images from "../../assets/images/images";
import { routes } from "../../config/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { RootStore } from "../../redux/store";
import { register } from "../../redux/auth/auth-thunk";
import { loginItems } from "../../config/constants";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootStore) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ name, email, password }))
      .then(() => console.log("Register action dispatched"))
      .catch((error) => console.log("Error dispatching register action: ", error));
    navigate(routes.login);
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
        <div className="hidden lg:flex w-[45%] bg-[#0f0e0c] flex-col items-center justify-end pb-64 relative overflow-hidden shrink-0">
          <img
            src={images.detailBanner}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Fashion banner"
          />

          <div className="relative text-center px-56">
            <div className="flex items-center justify-center gap-12 mb-20">
              <span className="block w-10 h-px bg-[#b5854a]" />
              <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[#b5854a]">New Here</span>
              <span className="block w-10 h-px bg-[#b5854a]" />
            </div>
            <h2
              className="text-[#fefcf8] font-light leading-[1.05] mb-24"
              style={{ ...serif, fontSize: "clamp(2rem,3vw,3rem)" }}
            >
              Join the<br />
              <em className="italic text-[#d4a96a]">COZA family.</em>
            </h2>
            <p className="text-[0.82rem] leading-[1.8] text-white/45 max-w-280 mx-auto mb-40">
              Create your profile for faster checkout, exclusive offers and order tracking.
            </p>

            <div className="flex flex-col gap-12 text-left max-w-240 mx-auto">
              {[
                "Free shipping on first order",
                "Early access to new arrivals",
                "Exclusive member discounts",
              ].map(perk => (
                <div key={perk} className="flex items-center gap-12">
                  <span className="w-16 h-16 border border-[#b5854a] flex items-center justify-center text-[#b5854a] text-[9px] shrink-0">
                    ✓
                  </span>
                  <span className="text-[0.78rem] text-white/55">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-32 py-64 overflow-y-auto">
          <div className="w-full max-w-400">
            <div className="text-center mb-40">
              <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[#b5854a] mb-12">
                Create Profile
              </p>
              <h1
                className="text-[#0f0e0c] font-light leading-[1.1] mb-8"
                style={{ ...serif, fontSize: "clamp(1.8rem,2.5vw,2.4rem)" }}
              >
                Sign Up
              </h1>
              <p className="text-[0.82rem] text-[#8a8278]">Continue with your email address</p>
            </div>

            <p className="text-[0.72rem] text-[#c2b9a8] mb-24">* Required field</p>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-20">
              <div>
                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#8a8278] mb-6">
                  Username *
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-sm border border-[#e8e1d5] bg-[#fefcf8] px-16 py-14 pr-40 text-[0.85rem] text-[#0f0e0c] outline-none placeholder:text-[#c2b9a8] focus:border-[#b5854a] transition-colors duration-200"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c2b9a8] pointer-events-none">
                    <img src={images.pencilIcon} alt="" className="w-3.5 h-3.5 opacity-50" />
                  </span>
                </div>
              </div>

              <div>
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
                    className="w-full rounded-sm border border-[#e8e1d5] bg-[#fefcf8] px-16 py-14 pr-40 text-[0.85rem] text-[#0f0e0c] outline-none placeholder:text-[#c2b9a8] focus:border-[#b5854a] transition-colors duration-200"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c2b9a8] pointer-events-none">
                    <AddressIcon />
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#8a8278] mb-6">
                  Create Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-sm border border-[#e8e1d5] bg-[#fefcf8] px-16 py-14 pr-40 text-[0.85rem] text-[#0f0e0c] outline-none placeholder:text-[#c2b9a8] focus:border-[#b5854a] transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#c2b9a8] hover:text-[#8a8278] transition-colors p-0 flex items-center"
                  >
                    <EyeSlashIcon />
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="mt-8 flex gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`h-2 flex-1 transition-colors duration-300 ${password.length >= i * 3
                          ? password.length >= 12 ? "bg-[#b5854a]" : "bg-[#c2b9a8]"
                          : "bg-[#e8e1d5]"
                          }`}
                      />
                    ))}
                  </div>
                )}
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
                className="w-full py-16 rounded-sm bg-[#0f0e0c] text-[#fefcf8] text-[0.78rem] tracking-[0.18em] uppercase border-none cursor-pointer font-inherit hover:bg-[#b5854a] transition-colors duration-300"
              >
                Create My Profile
              </button>

              {error && (
                <p className="text-[0.8rem] text-red-600 text-center">{error}</p>
              )}

              <p className="text-center text-[0.78rem] text-[#8a8278]">
                Already have an account?{" "}
                <Link
                  to={routes.login}
                  className="text-[#0f0e0c] no-underline border-b border-[#0f0e0c] pb-2 hover:text-[#b5854a] hover:border-[#b5854a] transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
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
              {loginItems.map(({ icon: Icon, title, desc }) => (
                <div key={title}>
                  <div className="w-40 h-40 border border-[#e8e1d5] flex items-center justify-center text-[#b5854a] mx-auto mb-16">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <p className="text-[0.72rem] tracking-[0.12em] uppercase text-[#0f0e0c] font-medium mb-8">{title}</p>
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

export default RegisterPage;