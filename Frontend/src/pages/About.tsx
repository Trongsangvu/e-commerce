import { Header } from "../components/layout/Header";
import images from "../assets/images/images";
import { Footer } from '../components/layout/Footer';

export const About: React.FC = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="relative">
                    <img src={images.bannerAbout} alt="about image" />
                    <span className="absolute top-[65%] left-[45%] font-[GucciSansPro-bold] text-5xl text-white uppercase">About</span>
                </div>
                <div className="mx-58 pt-75 pb-148">
                    <section>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center">
                            <div className="pr-85">
                                <h3 className="capitalize pb-35 font-[GucciSansPro-bold] text-3xl">our story</h3>
                                <p className="font-[GucciSansPro-light] pb-26 text-[#979599]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
                                </p>
                                <p className="font-[GucciSansPro-light] pb-26 text-[#979599]">
                                    Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula. 
                                </p>
                                <p className="font-[GucciSansPro-light] text-[#979599]">
                                    Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
                                </p>
                            </div>
                            <div className="relative group overflow-hidden w-[370px]">
                                <img 
                                    className="w-[370px] h-[370px] cursor-pointer transition-transform duration-500 group-hover:scale-110" 
                                    src={images.bannerAboutStory} alt="bannerAboutStory1" 
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="mx-58 pt-75 pb-148">
                    <section>
                        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-8 items-center">
                            <div className="relative group overflow-hidden w-[370px]">
                                <img 
                                    className="w-[370px] h-[370px] cursor-pointer transition-transform duration-500 group-hover:scale-110" 
                                    src={images.bannerAboutStory1} alt="bannerAboutStory1" 
                                />
                            </div>
                            <div className="pl-85">
                                <h3 className="capitalize pb-35 font-[GucciSansPro-bold] text-3xl">our mission</h3>
                                <p className="font-[GucciSansPro-light] pb-26 text-[#979599]">
							        Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.
                                </p>
                                <div className="border-l-2 border-[#ccc] pl-30">
                                    <p className="italic font-[GucciSansPro-light] pb-26 text-[#888]">
                                        Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
                                    </p>
                                    <span className="text-[#555] font-[GucciSansPro-book]">- Steve Job's</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}