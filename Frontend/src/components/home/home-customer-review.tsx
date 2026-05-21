import { REVIEWS } from "../../config/constants";

const HomeCustomerReviews = () => {
  return (
    <section className="bg-[#f5f2ec] px-48 py-80">
      <div className="max-w-1200 mx-auto">
        <div className="flex items-end justify-between mb-48">
          <div>
            <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[#b5854a] mb-8">
              Reviews
            </p>

            <h2
              className="font-light leading-[1.1] text-[#0f0e0c]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 3vw, 3rem)",
              }}
            >
              What Our Customers Say
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-24">
          {REVIEWS.map(({ initials, name, stars, text }) => (
            <div key={name} className="bg-[#fefcf8] p-32 border border-[#e8e1d5]">
              <p className="text-[#b5854a] tracking-widest mb-16">{stars}</p>

              <p
                className="leading-[1.65] text-[#0f0e0c] italic mb-24"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.05rem",
                }}
              >
                {text}
              </p>

              <div className="flex items-center gap-12">
                <div className="w-36 h-36 rounded-full bg-[#e8e1d5] flex items-center justify-center text-[0.72rem] font-medium text-[#8a8278]">
                  {initials}
                </div>

                <div>
                  <p className="text-[0.82rem] font-medium text-[#0f0e0c]">
                    {name}
                  </p>
                  <p className="text-[0.72rem] tracking-[0.08em] text-[#c2b9a8]">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCustomerReviews;