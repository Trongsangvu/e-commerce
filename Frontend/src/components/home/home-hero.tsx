import images from "../../assets/images/images";

interface HomeHeroProps {
  bannerRef: React.RefObject<HTMLDivElement | null>;
  isBannerVisible: boolean;
};

const HomeHero = ({ bannerRef, isBannerVisible }: HomeHeroProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <div ref={bannerRef} className="grid grid-cols-2 min-h-screen pt-72">
      <div className="relative flex flex-col justify-center bg-[#f5f2ec] px-96 py-80 overflow-hidden">
        {/* <div className="absolute -top-80 -right-80 w-300 h-300 rounded-full border border-[#c2b9a8] opacity-40 pointer-events-none" /> */}

        <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.22em] uppercase text-[#b5854a]">
          <span className="inline-block w-8 h-px bg-[#b5854a]" />
          Spring Summer {currentYear}
        </div>

        <h1
          className="mb-7 font-light leading-[1.05] tracking-[-0.01em] text-[#0f0e0c]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3.5rem, 5vw, 5.5rem)",
          }}
        >
          Dress with
          <br />
          <em className="not-italic text-[#b5854a]">intention,</em>
          <br />
          live with style.
        </h1>

        <p className="text-[0.9rem] leading-[1.8] text-[#8a8278] max-w-[320px] mb-10">
          Refined silhouettes for the modern wardrobe. Timeless pieces crafted
          with care — from casual ease to evening elegance.
        </p>

        <div className="flex items-center gap-16">
          <a
            href="#"
            className="bg-[#0f0e0c] text-[#fefcf8] px-9 py-[0.9rem] text-[0.78rem] tracking-[0.12em] uppercase no-underline hover:bg-[#b5854a] transition-colors duration-300"
          >
            For Her
          </a>

          <a
            href="#"
            className="text-[#8a8278] text-[0.78rem] tracking-widest uppercase no-underline flex items-center gap-1 hover:text-[#0f0e0c] transition-colors duration-200 after:content-['→']"
          >
            For Him
          </a>
        </div>
      </div>

      <div className="relative bg-[#0f0e0c] flex items-center justify-center overflow-hidden">
        <img
          src={images.slider}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Fashion banner"
        />

        <div
          className="absolute top-1/2 left-10 text-white/40 text-[0.68rem] tracking-[0.18em] uppercase pointer-events-none"
          style={{
            writingMode: "vertical-rl",
            transform: "translateY(-50%) rotate(180deg)",
          }}
        >
          New Season — SS{currentYear}
        </div>

        <div
          className={`absolute bottom-10 right-10 w-100 h-100 rounded-full border border-white/20 flex flex-col items-center justify-center text-center text-white/70 transition-opacity duration-500 ${isBannerVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <span
            className="block text-[1.6rem] leading-none font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            -30%
          </span>
          <small className="text-[0.62rem] tracking-[0.15em] uppercase mt-0.5">
            Off today
          </small>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;