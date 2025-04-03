import images from "../assets/images/images"
import { Footer } from '../components/layout/Footer';
import { GoogleMapComponent } from '../api/GoolgeMap';

export const Contact: React.FC = () => {
    return (
        <div>
            <div className="mb-90">
                <div className="mt-[70px] relative">
                    <img src={images.bannerAbout} alt="Banner Contact" />
                    <div className="absolute top-1/2 left-[45%]">
                        <span className="uppercase font-[GucciSansPro-bold] text-white text-4xl">contact</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="max-w-[1200px] pt-[106px]">
                        <div className="grid grid-cols-2">
                            <div className="border border-[#e6e6e6] px-50 pt-50">
                                <h3 className="font-[Poppins-regular] text-[#333] text-center mb-30">Send Us A Message</h3>
                                <div className="relative flex items-center rounded-[2px] h-50 border border-[#e6e6e6] px-30 mb-20">
                                    <div className="pr-30">
                                        <img className="w-22 h-18" src={images.emailAddress} alt="email address" />
                                    </div>
                                    <input className="outline-none w-full font-[Poppins-regular]" type="text" placeholder="Your Email Address"/>
                                </div>
                                <div className="border border-[#e6e6e6] px-20 pt-25 mb-20">
                                    <textarea className="outline-none w-full min-h-[199px] font-[Poppins-regular]" name="msg" placeholder="How can we help?"></textarea>
                                </div>
                                <div className="bg-[#222222] h-46 rounded-[22px] flex justify-center items-center mb-20 cursor-pointer">
                                    <button className="uppercase text-white font-[Poppins-medium]">
                                        submit
                                    </button>
                                </div>
                            </div>

                            <div className="border border-[#e6e6e6] px-50 pt-50">
                                <div className="pb-20">
                                    <div className="flex">
                                        <div className="w-60 place-items-center">
                                            <img className="w-37 h-37" src={images.location} alt="location" />
                                        </div>
                                        <div className="w-[337px]">
                                            <span className="font-[Poppins-regular] text-[#333]">Address</span>
                                            <p className="font-[Poppins-regular] text-[#888] pt-20">
                                                Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-20">
                                    <div className="flex">
                                        <div className="w-60 place-items-center">
                                            <img className="w-22 h-22" src={images.telephone} alt="telephone" />
                                        </div>
                                        <div className="w-[337px]">
                                            <span className="font-[Poppins-regular] text-[#333]">Lets Talk</span>
                                            <p className="pt-20 font-[Poppins-regular] text-[#6774d5]">
                                                +1 800 603 6035
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="w-60 place-items-center">
                                            <img className="w-22 h-22" src={images.emailAddress} alt="email" />
                                        </div>
                                        <div className="w-[337px]">
                                            <span className="font-[Poppins-regular] text-[#333]">Sale Support</span>
                                            <p className="pt-20 font-[Poppins-regular] text-[#6774d5]">
                                                sangv906@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <GoogleMapComponent />
            </div>
            <Footer />
        </div>
    )
}