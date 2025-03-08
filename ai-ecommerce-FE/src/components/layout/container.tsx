

export const Container:React.FC = () => {
    return (
        <>
            <div className="container">
                <div>
                    <h3 className="uppercase text-4xl leading-none font-bold font-[Poppins-bold]">product overview</h3>
                </div>
                <div>
                    <div>
                        <button className="py-5 pr-32 text-sm leading-[1.2] font-sans font[Poppins-regular] text-[#888]">
                            All Products
                        </button>
                        <button className="py-5 pr-32 text-sm leading-[1.2] font-sans font[Poppins-regular] text-[#888] capitalize">
                            women
                        </button>
                        <button className="py-5 pr-32 text-sm leading-[1.2] font-sans font[Poppins-regular] text-[#888] capitalize">
                            men
                        </button>
                        <button className="py-5 pr-32 text-sm leading-[1.2] font-sans font[Poppins-regular] text-[#888] capitalize">
                            bag
                        </button>
                        <button className="py-5 pr-32 text-sm leading-[1.2] font-sans font[Poppins-regular] text-[#888] capitalize">
                            shoes
                        </button>
                        <button className="py-5 pr-32 text-sm leading-[1.2] font-sans font[Poppins-regular] text-[#888] capitalize">
                            watches
                        </button>
                    </div>

                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}