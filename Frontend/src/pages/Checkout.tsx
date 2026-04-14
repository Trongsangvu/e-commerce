export const Checkout: React.FC = () => {
  return (
    <>
      <header className="h-120">
        <div className="bg-[#1b1b1b] h-120 flex justify-between items-center px-27">
          <div>
            <a
              className="text-white font-[GucciSansPro-light] tracking-[-0.03rem] text-13"
              href=""
            >
              Back to Shopping Bag
            </a>
          </div>
          <div>
            <h3 className="text-white font-[GucciSansPro-medium uppercase text-30 tracking-2">
              cozastore
            </h3>
          </div>
          <div>
            <span className="text-white font-[GucciSansPro-light] text-13">
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
                <span className="font-[GucciSansPro-book] tracking-[-0.03rem] uppercase text-12 text-black">
                  you are checking out as:
                </span>
                <span className="text-12 text-black font-[GucciSansPro-book]"></span>
              </div>
            </div>
            <section></section>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
