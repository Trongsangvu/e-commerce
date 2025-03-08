import { MENU_ITEMS, MENU_ITEMS_2 } from "../../config/menu";
import { MenuItem } from "../common/MenuItem";

interface MenuListProps {
    isOpen: boolean;
}

export const MenuList: React.FC<MenuListProps> = ({ isOpen }) => {
    return (
        <ul className={`transition-all duration-500 delay-200 
            ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
            {MENU_ITEMS.map((item, index) => (
                <MenuItem 
                    key={`menu1-${index}`}
                    title={item.title}
                    delay={index * 50}
                />
            ))}
            {MENU_ITEMS_2.map((item, index) => (
                <MenuItem 
                    key={`menu2-${index}`}
                    title={item.title}
                    delay={(index + MENU_ITEMS.length) * 50}
                />
            ))}
        </ul>
    )
}