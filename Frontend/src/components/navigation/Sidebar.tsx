import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../assets/images/icons/icons";
import { usePreventScroll } from "../../hooks/use-prevent-scroll";
import { sideBarHide } from "../../redux/slices/sidebar-slice";
import { AppDispatch, RootStore } from "../../redux/store";
import { Overlay } from "../common/Overlay";
import { MenuList } from "../menu/MenuList";

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootStore) => state.sideBar.isOpen);
  usePreventScroll(isOpen);

  const handleClose = () => {
    dispatch(sideBarHide());
  };

  return (
    <>
      <Overlay isOpen={isOpen} handleClose={handleClose} />
      <div
        className={`fixed z-70 top-0 right-0 bg-white w-596 h-screen
                transform transition-transform duration-500 ease-out will-change-transform overflow-hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div>
          <div className="flex items-center justify-end">
            <button
              className="absolute z-10 top-10 right-10 flex items-center justify-center w-48 h-48 rounded-full cursor-pointer 
                            before:absolute before:w-full before:h-full before:bg-black before:rounded-full before:transition-transform 
                            before:duration-500 hover:before:scale-90"
              onClick={handleClose}
            >
              <CloseIcon className="relative text-white text-5xl" />
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            <div className="px-80 pb-80 pt-70">
              <MenuList isOpen={isOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
