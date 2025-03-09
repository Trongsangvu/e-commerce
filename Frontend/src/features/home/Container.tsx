import images from "../../assets/images/images";
const Container:React.FC = () => {
    return (
        <main className="w-full">
            <div className="flex flex-col">
                <div className="pb-10">
                    <h3 className="uppercase text-4xl font-bold">product overview</h3>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center ">
                    <div className="flex flex-wrap mb-6 md:mb-0">
                        <button className="py-3 mr-[17px] text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] text-[#888]">All Products</button>
                        <button className="py-3 mx-[17px] text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] text-[#888] capitalize">women</button>
                        <button className="py-3 mx-[17px] text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] text-[#888] capitalize">men</button>
                        <button className="py-3 mx-[17px] text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] text-[#888] capitalize">bag</button>
                        <button className="py-3 mx-[17px] text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] text-[#888] capitalize">shoes</button>
                        <button className="py-3 mx-[17px] text-base leading-[1.2] cursor-pointer font-sans font[Poppins-regular] text-[#888] capitalize">watches</button>
                    </div>

                    <div>
                        <div className="flex gap-8">
                            <div className="flex items-center cursor-pointer rounded-sm py-7 px-[15px] border border-[#e6e6e6]">
                                <img className="w-12 h-15" src={images.filterIcon} />
                                <p className="capitalize pl-6 text-[#888] font-[var(--font-pops)]">filter</p>
                            </div>
                            <div className="flex items-center cursor-pointer rounded-sm py-7 px-[15px] border border-[#e6e6e6]">
                                <img  className="w-17 h-20" src={images.searchIcon} />
                                <p className="capitalize pl-6 text-[#888] font-[var(--font-pops)]">search</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Container;