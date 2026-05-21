import { FOOTER_ITEMS } from "../../config/constants";

const Footer = () => {
  return (
    <footer className="bg-[#0a0908] px-48 pt-64 pb-32 text-white/45">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-48 mb-48 pb-48 border-b border-white/8">
        <div>
          <p className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-light tracking-[0.15em] text-[#fefcf8] mb-4">
            COZA
          </p>

          <p className="text-[0.82rem] leading-[1.8] max-w-240 mb-6">
            Curated fashion for those who believe that how you dress is how you
            present yourself to the world.
          </p>

          <div className="flex gap-3">
            {["f", "in", "tw", "yt"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-34 h-34 border border-white/12 flex items-center justify-center text-white/40 no-underline text-[0.8rem] hover:text-[#fefcf8] hover:border-white/30 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_ITEMS.map(({ title, links }) => (
          <div key={title}>
            <p className="text-[0.72rem] tracking-[0.18em] uppercase text-[#fefcf8] mb-5">
              {title}
            </p>

            <ul className="list-none p-0 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[0.82rem] text-white/40 no-underline hover:text-[#fefcf8] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs">
        <span>© {new Date().getFullYear()} COZA Store. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
};

export default Footer;