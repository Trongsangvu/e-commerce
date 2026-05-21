import { ANNOUNCEMENTS } from "../../config/constants";

const HomeAnnouncementBar = () => {
  return (
    <div className="bg-[#b5854a] py-[0.85rem] overflow-hidden">
      <style>
        {`
          @keyframes coz-marquee {
            0% { transform: translateX(100vw) }
            100% { transform: translateX(-100%) }
          }
        `}
      </style>

      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{
          animation: "coz-marquee 18s linear infinite",
        }}
      >
        {ANNOUNCEMENTS.map((text, index) => (
          <span
            key={text}
            className="shrink-0 flex items-center gap-8 text-[0.72rem] tracking-[0.2em] uppercase text-[#fefcf8]"
          >
            {text}

            {index !== ANNOUNCEMENTS.length - 1 && (
              <span className="w-5 h-5 rounded-full bg-white/50 shrink-0" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeAnnouncementBar;