import { Link } from "react-router-dom";
import { MenuItems } from "../../config/menu";

interface MenuProfileProps {
    item: MenuItems;
    index: number;
    onLogout?: () => void;
}
export const MenuProfile: React.FC<MenuProfileProps> = ({ item, onLogout }) => {
    return (
        <li 
            className="font-[GucciSansPro-bold] uppercase mb-32 cursor-pointer" 
            onClick={() => {
                if(item.id === 'sign out' && onLogout) {
                    onLogout();
                }
            }}    
        >
            <Link to={item.path || "#"}>
                {item.title}
            </Link>
        </li>
    );
}