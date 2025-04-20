export const Checkout: React.FC = () => {
    return ( 
        <>
            <header className="h-[120px]">
                <div className="bg-[#1b1b1b] h-[120px] flex justify-between items-center px-27">
                    <div>
                        <a className="text-[#fff] font-[GucciSansPro-light] tracking-[-0.03rem] text-[13px]" href="">Back to Shopping Bag</a>
                    </div>
                    <div>
                        <h3 className="text-[#fff] font-[GucciSansPro-medium uppercase text-[30px] tracking-[2px]">cozastore</h3>
                    </div>
                    <div>
                        <span className="text-[#fff] font-[GucciSansPro-light] text-[13px]">
                            +84.393.400.682
                        </span>
                    </div>
                </div>
            </header>       
            <div className="content">
                <div>
                    <div>
                        <div>
                            <div>
                                <span className="font-[GucciSansPro-book] tracking-[-0.03rem] uppercase text-[12px] text-[#000]">you are checking out as:</span>
                                <span className="text-[12px] text-[#000] font-[GucciSansPro-book]"></span>
                            </div>
                        </div>
                        <section>

                        </section>
                    </div>
                    <div>

                    </div>
                </div>
            </div> 
        </>
     );
}

export default Checkout;