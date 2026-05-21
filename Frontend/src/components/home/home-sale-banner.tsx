import images from "../../assets/images/images";

const HomeSaleBanner = () => {
  return (
    <div className="grid grid-cols-2 min-h-500 bg-[#0f0e0c]">
      <div className="bg-[#1a1814] flex items-center justify-center">
        <img
          src={images.detailBanner}
          className="w-full h-full object-cover opacity-60"
          alt="Fashion banner"
        />
      </div>

      <div className="flex flex-col justify-center p-80">
        <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#d4a96a] mb-6">
          Limited Time Offer
        </p>

        <h2
          className="font-light leading-[1.05] text-[#fefcf8] mb-24"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.5rem, 3.5vw, 4rem)",
          }}
        >
          End of Season
          <br />
          <em className="italic text-[#d4a96a]">Sale</em> — Up to
          <br />
          40% Off
        </h2>

        <p className="text-[0.88rem] leading-[1.8] text-white/50 max-w-340 mb-10">
          Our biggest sale of the year. Discover timeless wardrobe essentials at
          prices you won't forget. While stocks last.
        </p>

        <a
          href="#"
          className="inline-block self-start px-9 py-[0.9rem] border border-white/25 text-[#fefcf8] text-[0.78rem] tracking-[0.12em] uppercase no-underline hover:border-[#d4a96a] hover:bg-[#b5854a]/15 transition-all duration-300"
        >
          Shop the Sale
        </a>
      </div>
    </div>
  );
};

export default HomeSaleBanner;