import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MenuToggle,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "../../assets/images/icons/icons";
import { MENU_HEADER, MENU_PROFILE } from "../../config/menu";
import { ROUTES } from "../../config/routes";
import { useFetch } from "../../hooks/use-fetch";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { useScroll } from "../../hooks/use-scroll";
import { ShoppingBag } from "../../pages/shop/ShoppingBagPage";
import { sideBarShow } from "../../redux/app/sidebar-slice";
import { logout } from "../../redux/auth/auth.thunk";
import { RootStore } from "../../redux/store";
import { getCart } from "../../services/cart-service";
import LANGUAGE from "../../utils/language.util";
import { MenuProfile } from "../menu/MenuProfile";
import Search from "../search/Search";
import Sidebar from "./Sidebar";
import Button from "../common/Button";

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootStore) => state.auth.isAuthenticated,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === ROUTES.login;
  const isRegisterPage = location.pathname === ROUTES.register;

  const menuRef = useRef<HTMLDivElement>(null);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowBag, setIsShowBag] = useState(false);
  const [delayedShowBag, setDelayedShowBag] = useState(false);

  const scroll = useScroll();

  const { data } = useFetch({
    queryKey: ["shopping-bag"],
    queryFn: getCart,
    enabled: isAuthenticated,
  });

  const cartItemsCount = data?.items?.length ?? 0;

  const filteredMenu = MENU_PROFILE.filter((item) => {
    if (isAuthenticated) {
      return item.id !== "sign in";
    }
    return item.id !== "my account" && item.id !== "sign out";
  });

  useEffect(() => {
    setIsShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShow = () => {
    dispatch(sideBarShow());
  };

  const handleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleShowMenuProfile = () => {
    setIsShowMenu(!isShowMenu);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsShowBag(false);
    setIsShowMenu(false);
    navigate(ROUTES.login);
  };

  const handleShowShoppingBag = useCallback(() => {
    if (!isShowBag) {
      setIsShowBag(true);
      setTimeout(() => {
        setDelayedShowBag(true);
      }, 300);
    } else {
      setDelayedShowBag(false);
      setTimeout(() => {
        setIsShowBag(false);
      }, 300);
    }
  }, [isShowBag]);

  const renderMenuProfile = () => {
    return filteredMenu.map((item) => (
      <MenuProfile
        key={item.id}
        item={item}
        onLogout={item.id === "sign out" ? handleLogout : undefined}
      />
    ));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out 
          ${
            isLoginPage || isRegisterPage || scroll
              ? "bg-white shadow-md"
              : "bg-transparent"
          }`}
      >
        <div className="height-72 z-1 shadow-xs flex items-center flex-1 justify-around pt-20 pb-20 px-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center mr-40">
              <Link to={ROUTES.home}>
                <h3
                  className={`text-2xl font-[GucciSansPro-medium] uppercase transition-colors duration-300 ${
                    isLoginPage || isRegisterPage || scroll
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {LANGUAGE.GENERAL.NAME}
                </h3>
              </Link>
            </div>
            <ul className="flex gap-4">
              {MENU_HEADER.map((item) => (
                <li
                  className={`px-10 mx-10 cursor-pointer font-[GucciSansPro-book] hover:text-[#6774d5] transition-colors duration-300 ${
                    location.pathname === item.path
                      ? "text-[#6774d5]"
                      : isLoginPage || isRegisterPage || scroll
                        ? "text-black"
                        : "text-white"
                  }`}
                  key={item.id}
                >
                  <Link to={item.path || "#"}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex">
            <li className="">
              <Button
                className="relative hover:opacity-80 hover:cursor-pointer transition-opacity"
                onClick={handleShowShoppingBag}
              >
                <ShoppingCartIcon
                  fillColor={`${
                    isLoginPage || isRegisterPage || scroll ? "black" : "white"
                  }`}
                />
                {cartItemsCount > 0 && (
                  <span className="absolute top-26 right-[20.7%] text-[10px] text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
              {delayedShowBag && (
                <div className="absolute left-[50%]">
                  <ShoppingBag
                    handleShowBag={handleShowShoppingBag}
                    isVisible={delayedShowBag}
                  />
                </div>
              )}
            </li>
            <li className="pl-15">
              <Button
                className="hover:opacity-80 hover:cursor-pointer transition-opacity"
                onClick={handleShowMenuProfile}
              >
                <UserIcon
                  strokeColor={`${
                    isLoginPage || isRegisterPage || scroll ? "black" : "white"
                  }`}
                />
              </Button>
              {isShowMenu && (
                <div
                  className="absolute right-[16%] top-75 h-auto rounded-sm bg-white shadow-xl"
                  ref={menuRef}
                >
                  <ul className="px-16 pt-32">{renderMenuProfile()}</ul>
                </div>
              )}
            </li>
            <li className="pl-15">
              <Button
                className="hover:opacity-80 hover:cursor-pointer transition-opacity"
                onClick={handleSearch}
              >
                <SearchIcon
                  fillColor={`${
                    isLoginPage || isRegisterPage || scroll ? "black" : "white"
                  }`}
                />
              </Button>
            </li>
            {isSearchVisible && (
              <Search
                isSearchVisible={isSearchVisible}
                setIsSearchVisible={setIsSearchVisible}
              />
            )}
            <li>
              <nav
                className="flex items-center pl-15 gap-2 hover:cursor-pointer relative"
                onClick={handleShow}
              >
                <MenuToggle
                  fillColor={`${
                    isLoginPage || isRegisterPage || scroll ? "black" : "white"
                  }`}
                />
                <span
                  className={`font-[GucciSansPro-book] uppercase text-xs transition-colors duration-300 
                    ${
                      isLoginPage || isRegisterPage || scroll
                        ? "text-black"
                        : "text-white"
                    }`}
                >
                  {LANGUAGE.GENERAL.MENU}
                </span>
              </nav>
            </li>
          </ul>
        </div>
      </header>
      <Sidebar />
    </>
  );
};

export default Header;
