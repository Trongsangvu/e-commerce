import { FacebookIcon, IgIcon, WhatsAppIcon } from '../../assets/images/icons/icons';
import images from '../../assets/images/images';
export const Footer: React.FC = () => {
    return ( 
        <footer className='mt-auto'>
            <div className="bg-[#222222] px-[164px] pt-[75px] pb-[32px]">
                <div className="grid grid-cols-4 gap-10">
                    <div>
                        <h4 className="text-[#fff] text-[15px] leading-[1.6] uppercase pb-[30px] font-[Montserrat-Bold]">categories</h4>
                        <ul>
                            <li className="pb-10">
                                <a href="#" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Women</a>
                            </li>
                            <li className="pb-10">
                                <a href="#" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Men</a>
                            </li>
                            <li className="pb-10">
                                <a href="#" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Shoes</a>
                            </li>
                            <li className="pb-10">
                                <a href="#" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Watches</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#fff] text-[15px] leading-[1.6] uppercase pb-[30px] font-[Montserrat-Bold]">help</h4>
                        <ul>
                            <li className="pb-10">
                                <a href="" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Track Order</a>
                            </li>
                            <li className="pb-10">
                                <a href="" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Returns</a>
                            </li>
                            <li className="pb-10">
                                <a href="" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">Shipping</a>
                            </li>
                            <li className="pb-10">
                                <a href="" className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">FAQs</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#fff] text-[15px] leading-[1.6] uppercase pb-[30px] font-[Montserrat-Bold]">get in touch</h4>
                        <p className="font-[Poppins-regular] text-[#b2b2b2] text-[13px]">
    						Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
                        </p>
                        <div className='flex items-center gap-10 pt-30'>
                            <a href="#">
                                <FacebookIcon className={"hover:fill-[#6774d5]"}/>
                            </a>
                            <a href="#">
                                <IgIcon className={"hover:fill-[#6774d5]"}/>
                            </a>
                            <a href="#">
                                <WhatsAppIcon className={"hover:fill-[#6774d5]"}/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[#fff] text-[15px] leading-[1.6] uppercase pb-[30px] font-[Montserrat-Bold]">newsletter</h4>
                        <form action="">
                            <div>
                                <div className="w-[310px] relative group">
                                    <input 
                                        className="pb-5 w-full text-[13px] font-[Poppins-regular] border-none outline-none text-[white]" type="text" placeholder="email@gmail.com"
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 w-full border-b transition-all duration-500 ease-in-out border-[#ccc] origin-left scale-x-100 group-focus-within:border-[#6774d5] group-focus-within:scale-x-100"
                                    ></div>
                                </div>
                            </div>
                            <div className="pt-18">
                                <button className="cursor-pointer uppercase transition-all duration-500 hover:bg-[#fff] hover:text-[#6774d5] bg-[#6774d5] font-[Poppins-medium] rounded-3xl h-[46px] min-w-[179px] text-[#fff]">subcribe</button>
                            </div>
                        </form> 
                    </div>
                </div>
                <div className='pt-35'>
                    <p className=' flex justify-center font-[Poppins-regular] text-[#717475] text-[13px]'>
                        Copyright © {new Date().getFullYear()}. All Rights Reserved | Made with
                        <img className='w-16 h-16 mx-4 transition-all duration-300 invert' src={images.heartIcon} alt="heart icon"/> by 
                        <a href="#" className='mx-5 text-[#6774d5]'>Colorlib</a>
                        & distributed by
                        <a href="https://github.com/mangtrungzos" className='ml-5 text-[#6774d5]'>Mangtrungzos</a>
                    </p>
                </div>
            </div>
        </footer>
     );
}
