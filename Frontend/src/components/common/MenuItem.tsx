import React from "react";
import { MenuItems } from "../../config/menu";
import { AngleRightIcon } from "../../assets/images/icons/icons";
export const MenuItem: React.FC<MenuItems> = ({ title, delay }) => (
    <li 
        className='flex items-center hover:cursor-pointer font-montserrat pb-24 transform transition-all duration-500 hover:translate-x-2' 
        style={{ transitionDelay: `${delay}ms` }}
    >
        {title}
        <AngleRightIcon />  
    </li>
);