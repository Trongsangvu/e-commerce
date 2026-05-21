const HomeSubscribeSection = () => {
  return (
    <div className="bg-[#0f0e0c] px-48 py-80 text-center">
      <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#d4a96a] mb-16">
        Stay in the Loop
      </p>

      <h2
        className="font-light text-[#fefcf8] mb-12"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2rem, 3vw, 3.5rem)",
        }}
      >
        Join the COZA Circle
      </h2>

      <p className="text-[0.88rem] leading-[1.7] text-white/45 max-w-400 mx-auto mb-40">
        Early access to new arrivals, exclusive offers, and style inspiration —
        delivered straight to your inbox.
      </p>

      <div className="flex max-w-460 mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 bg-white/6 border border-white/15 border-r-0 px-5 py-[0.9rem] text-[0.88rem] text-[#fefcf8] outline-none placeholder:text-white/30 focus:border-white/35 transition-colors"
        />

        <button className="bg-[#b5854a] border border-[#b5854a] text-[#fefcf8] px-7 py-[0.9rem] text-[0.78rem] tracking-[0.12em] uppercase cursor-pointer hover:bg-[#d4a96a] hover:border-[#d4a96a] transition-colors duration-200">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default HomeSubscribeSection;