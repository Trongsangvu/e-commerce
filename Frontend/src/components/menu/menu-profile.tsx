import { memo } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "../../config/menu";

interface MenuProfileProps {
  item: MenuItems;
  onLogout?: () => void;
}

const MenuProfileUser = ({ item, onLogout }: MenuProfileProps) => {
  return (
    <li
      className={`font-[GucciSansPro-bold] uppercase mb-32 cursor-pointer 
        ${item.id === "sign out" ? "border-t pt-20 border-[#ccc]" : ""}`}
      onClick={() => {
        if (item.id === "sign out" && onLogout) {
          onLogout();
        }
      }}
    >
      <Link to={item.path || "#"}>{item.title}</Link>
    </li>
  );
};

export const MenuProfile = memo(MenuProfileUser);
