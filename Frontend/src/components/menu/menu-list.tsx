import { menuItems, menuItems2 } from "../../config/menu";
import MenuItem from "./menu-item";

interface MenuListProps {
  isOpen: boolean;
}

const MenuList = ({ isOpen }: MenuListProps) => {
  return (
    <ul
      className={`transition-all duration-500 delay-200 
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={`menu1-${index}`}
          title={item.title}
          delay={index * 50}
        />
      ))}
      {menuItems2.map((item, index) => (
        <MenuItem
          key={`menu2-${index}`}
          title={item.title}
          delay={(index + menuItems.length) * 50}
        />
      ))}
    </ul>
  );
};

export default MenuList;
