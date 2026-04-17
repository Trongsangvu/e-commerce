import {
  FacebookIcon,
  IgIcon,
  WhatsAppIcon,
} from "../../assets/images/icons/icons";
import images from "../../assets/images/images";
import LANGUAGE from "../../utils/language.util";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-[#222222] px-41 pt-18.75 pb-8">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h4 className="text-white text-[15px] leading-[1.6] uppercase pb-7.5 font-[Montserrat-Bold]">
              {LANGUAGE.GENERAL.CATEGORIES}
            </h4>
            <ul>
              <li className="pb-10">
                <a
                  href="#"
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.WOMEN}
                </a>
              </li>
              <li className="pb-10">
                <a
                  href="#"
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.MEN}
                </a>
              </li>
              <li className="pb-10">
                <a
                  href="#"
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.SHOES}
                </a>
              </li>
              <li className="pb-10">
                <a
                  href="#"
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.WATCHES}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[15px] leading-[1.6] uppercase pb-7.5 font-[Montserrat-Bold]">
              {LANGUAGE.GENERAL.HELP}
            </h4>
            <ul>
              <li className="pb-10">
                <a
                  href=""
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.TRACK_ORDER}
                </a>
              </li>
              <li className="pb-10">
                <a
                  href=""
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.RETURNS}
                </a>
              </li>
              <li className="pb-10">
                <a
                  href=""
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.SHIPPING}
                </a>
              </li>
              <li className="pb-10">
                <a
                  href=""
                  className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]"
                >
                  {LANGUAGE.GENERAL.FAQS}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[15px] leading-[1.6] uppercase pb-7.5 font-[Montserrat-Bold]">
              {LANGUAGE.GENERAL.GET_IN_TOUCH}
            </h4>
            <p className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">
              {LANGUAGE.GENERAL.QUESTION}
            </p>
            <div className="flex items-center gap-10 pt-30">
              <a href="#">
                <FacebookIcon className={"hover:fill-[#6774d5]"} />
              </a>
              <a href="#">
                <IgIcon className={"hover:fill-[#6774d5]"} />
              </a>
              <a href="#">
                <WhatsAppIcon className={"hover:fill-[#6774d5]"} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-[15px] leading-[1.6] uppercase pb-7.5 font-[Montserrat-Bold]">
              {LANGUAGE.GENERAL.NEWS_LETTER}
            </h4>
            <form action="">
              <div>
                <div className="w-77.5 relative group">
                  <input
                    className="pb-5 w-full text-[13px] font-[Poppins-regular] border-none outline-none text-[white]"
                    type="text"
                    placeholder="email@gmail.com"
                  />
                  <div className="absolute bottom-0 left-0 w-full border-b transition-all duration-500 ease-in-out border-[#ccc] origin-left scale-x-100 group-focus-within:border-[#6774d5] group-focus-within:scale-x-100"></div>
                </div>
              </div>
              <div className="pt-18">
                <button className="cursor-pointer uppercase transition-all duration-500 hover:bg-white hover:text-[#6774d5] bg-[#6774d5] font-[Poppins-medium] rounded-3xl h-11.5 min-w-44.75 text-white">
                  {LANGUAGE.GENERAL.SUBSCRIBE}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="pt-35">
          <p className=" flex justify-center font-[Poppins-regular] text-[#717475] text-[13px]">
            Copyright © {new Date().getFullYear()}. All Rights Reserved | Made
            with
            <img
              className="w-16 h-16 mx-4 transition-all duration-300 invert"
              src={images.heartIcon}
              alt="heart icon"
            />{" "}
            by
            <a href="#" className="mx-5 text-[#6774d5]">
              Colorlib
            </a>
            & distributed by
            <a
              href="https://github.com/mangtrungzos"
              className="ml-5 text-[#6774d5]"
            >
              Mangtrungzos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
