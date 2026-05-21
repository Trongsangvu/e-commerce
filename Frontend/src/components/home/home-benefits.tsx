import { BENEFITS } from "../../config/constants";

const HomeBenefits = () => {
  return (
    <div className="border-t border-b border-[#e8e1d5] grid grid-cols-4 gap-8 px-48 py-40 bg-[#fefcf8]">
      {BENEFITS.map(({ icon, title, desc }) => (
        <div key={title} className="flex items-start gap-16">
          <div className="w-40 h-40 border border-[#e8e1d5] flex items-center justify-center text-[#b5854a] text-base shrink-0">
            {icon}
          </div>

          <div>
            <p className="text-[0.82rem] font-medium tracking-[0.05em] uppercase text-[#0f0e0c] mb-0.5">
              {title}
            </p>
            <p className="text-[0.78rem] text-[#8a8278] leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeBenefits;