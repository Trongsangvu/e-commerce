import { Link } from "react-router-dom";
import { MenuItems } from "../../config/menu";

interface MenuProfileProps {
    item: MenuItems;
    index: number;
}
export const MenuProfile: React.FC<MenuProfileProps> = ({ item }) => {
    return (
        <li className="font-[GucciSansPro-bold] uppercase mb-32 cursor-pointer" >
            <Link to={item.path || "#"}>
                {item.title}
            </Link>
        </li>
    );
}