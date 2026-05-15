import { MenuItems } from "../../config/menu";

const MenuItem = ({ title, delay }: MenuItems) => (
  <li
    className="flex items-center hover:cursor-pointer font-montserrat pb-24 transform transition-all duration-500 hover:translate-x-2"
    style={{ transitionDelay: `${delay}ms` }}
  >
    {title}
  </li>
);

export default MenuItem;
