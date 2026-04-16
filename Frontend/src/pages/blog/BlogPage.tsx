import images from "../../assets/images/images";
import LANGUAGE from "../../utils/language.util";
import ProductFeatures from "../product/ProductListPage";

const BlogPage = () => {
  return (
    <div>
      <div className="container">
        <div className="relative">
          <img src={images.bannerBlog} alt="bannerBlog" />
          <span className="absolute top-[65%] left-[45%] uppercase font-[GucciSansPro-bold] text-5xl text-white">
            {LANGUAGE.BLOG.NAME}
          </span>
        </div>
        <div className="grid gird-cols-2 md:grid-cols-[2fr_1fr] gap-8 mx-100 pt-60">
          <div className="pr-35">
            <div className="w-825">
              <div className="w-auto">
                <div className="relative group overflow-hidden">
                  <a href="#">
                    <img
                      className="w-auto h-413 transition-transform duration-500 group-hover:scale-110"
                      src={images.bannerBlog1}
                      alt="banner blog"
                    />
                  </a>
                </div>
                <div className="mb-30 pb-30">
                  <h4 className="font-[GucciSansPro-bold] text-3xl py-20">
                    8 Inspiring Ways to Wear Dresses in the Winter
                  </h4>
                  <p className="font-[GucciSansPro-book] text-[#555]">
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Fusce eget dictum tortor.
                    Donec dictum vitae sapien eu varius.
                  </p>
                  <div className="pt-10">
                    <a className="flex items-center gap-7 justify-end" href="#">
                      <span className="uppercase font-[Poppins-medium] text-[15px]">
                        continue reading
                      </span>
                      <img
                        className="w-15 h-15"
                        src={images.arrowRight}
                        alt="arrow"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-825">
              <div className="w-auto">
                <div className="relative group overflow-hidden">
                  <a href="#">
                    <img
                      className="w-auto h-413 transition-transform duration-500 group-hover:scale-110"
                      src={images.bannerBlog2}
                      alt="banner blog"
                    />
                  </a>
                </div>
                <div className="mb-30 pb-30">
                  <h4 className="font-[GucciSansPro-bold] text-3xl py-20">
                    The Great Big List of Men’s Gifts for the Holidays
                  </h4>
                  <p className="font-[GucciSansPro-book] text-[#555]">
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Fusce eget dictum tortor.
                    Donec dictum vitae sapien eu varius
                  </p>
                  <div className="pt-10">
                    <a className="flex items-center gap-7 justify-end" href="#">
                      <span className="uppercase font-[Poppins-medium] text-[15px]">
                        continue reading
                      </span>
                      <img
                        className="w-15 h-15"
                        src={images.arrowRight}
                        alt="arrow"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-825">
              <div className="w-auto">
                <div className="relative group overflow-hidden">
                  <a href="#">
                    <img
                      className="w-auto h-413 transition-transform duration-500 group-hover:scale-110"
                      src={images.bannerBlog3}
                      alt="banner blog"
                    />
                  </a>
                </div>
                <div className="mb-30 pb-30">
                  <h4 className="font-[GucciSansPro-bold] text-3xl py-20">
                    5 Winter-to-Spring Fashion Trends to Try Now
                  </h4>
                  <p className="font-[GucciSansPro-book] text-[#555]">
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Fusce eget dictum tortor.
                    Donec dictum vitae sapien eu varius
                  </p>
                  <div className="pt-10">
                    <a className="flex items-center gap-7 justify-end" href="#">
                      <span className="uppercase font-[Poppins-medium] text-[15px]">
                        continue reading
                      </span>
                      <img
                        className="w-15 h-15"
                        src={images.arrowRight}
                        alt="arrow"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-15 w-325">
            <div>
              <h4 className="font-[Poppins-bold] text-[#333] text-3xl pb-30">
                Categories
              </h4>
              <ul>
                <li className="cursor-pointer py-10 font-[GucciSansPro-light] border-t border-b border-[#ccc]">
                  Fashion
                </li>
                <li className="cursor-pointer py-10 font-[GucciSansPro-light] border-b border-[#ccc]">
                  Beauty
                </li>
                <li className="cursor-pointer py-10 font-[GucciSansPro-light] border-b border-[#ccc]">
                  Street Style
                </li>
                <li className="cursor-pointer py-10 font-[GucciSansPro-light] border-b border-[#ccc]">
                  Life Style
                </li>
                <li className="cursor-pointer py-10 font-[GucciSansPro-light] border-b border-[#ccc]">
                  DIY & Crafts
                </li>
              </ul>
            </div>
            <div>
              <ProductFeatures />
            </div>
            <div>
              <h4 className="font-[Poppins-bold] text-[#333] text-3xl mb-20">
                Archive
              </h4>
              <ul>
                <li className="py-10">
                  <a className="group flex justify-between" href="#">
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      July {new Date().getFullYear()}
                    </span>
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      (9)
                    </span>
                  </a>
                </li>
                <li className="py-10">
                  <a className="group flex justify-between" href="#">
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      June {new Date().getFullYear()}
                    </span>
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      (20)
                    </span>
                  </a>
                </li>
                <li className="py-10">
                  <a className="flex justify-between group" href="#">
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      May {new Date().getFullYear()}
                    </span>
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      (30)
                    </span>
                  </a>
                </li>
                <li className="py-10">
                  <a className="flex justify-between group" href="#">
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      January {new Date().getFullYear()}
                    </span>
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      (40)
                    </span>
                  </a>
                </li>
                <li className="py-10">
                  <a className="flex justify-between group" href="#">
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      February {new Date().getFullYear()}
                    </span>
                    <span className="font-[Poppins-regular] text-[#888] group-hover:text-[#717fe0]">
                      (21)
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-[Poppins-bold] text-3xl my-20">Tags</h4>
              <ul>
                <li className="inline-block cursor-pointer hover:border-[#717fe0] hover:text-[#717fe0] border border-solid border-[#ccc] min-h-30 font-[Poppins-regular] leading-[1.923] text-[#888] px-15 mr-5 mb-5 rounded-15">
                  Fashion
                </li>
                <li className="inline-block cursor-pointer hover:border-[#717fe0] hover:text-[#717fe0] border border-solid border-[#ccc] min-h-30 font-[Poppins-regular] leading-[1.923] text-[#888] px-15 mr-5 mb-5 rounded-15">
                  Lifestyle
                </li>
                <li className="inline-block cursor-pointer hover:border-[#717fe0] hover:text-[#717fe0] border border-solid border-[#ccc] min-h-30 font-[Poppins-regular] leading-[1.923] text-[#888] px-15 mr-5 mb-5 rounded-15">
                  Denim
                </li>
                <li className="inline-block cursor-pointer hover:border-[#717fe0] hover:text-[#717fe0] border border-solid border-[#ccc] min-h-30 font-[Poppins-regular] leading-[1.923] text-[#888] px-15 mr-5 mb-5 rounded-15">
                  Streetstyle
                </li>
                <li className="inline-block cursor-pointer hover:border-[#717fe0] hover:text-[#717fe0] border border-solid border-[#ccc] min-h-30 font-[Poppins-regular] leading-[1.923] text-[#888] px-15 mr-5 mb-5 rounded-15">
                  Crafts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
