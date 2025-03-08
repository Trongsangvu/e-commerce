
type IconProps = {
    className?: string;
    width?: number;
    height?: number;   
    strokeColor?: string; 
    fillColor?: string;
}

export const SearchIcon: React.FC<IconProps> = ({ className, width=24, height=24, fillColor='currentColor' }) => (
    <svg
        className={className}
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill={fillColor} 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
    >
        <path d="M20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C13.94 20 15.72 19.31 17.1 18.16L18.94 20L20 18.94L18.16 17.1C19.31 15.72 20 13.94 20 12ZM12 18.5C8.42 18.5 5.5 15.58 5.5 12C5.5 8.42 8.42 5.5 12 5.5C15.58 5.5 18.5 8.42 18.5 12C18.5 15.58 15.58 18.5 12 18.5Z" 
        fill="var(--_g-icon-fill-color)">
        </path>
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className, width=24, height=24, fillColor='white', strokeColor='black' }) => (
    <svg 
        className={className}
        width={width}
        height={height}
        viewBox="0 0 24 24" 
        fill={fillColor} 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
    >
        <path 
            d="M12 14C14.76 14 17 11.76 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9C7 11.76 9.24 14 12 14ZM12 5.5C13.93 5.5 15.5 7.07 15.5 9C15.5 10.93 13.93 12.5 12 12.5C10.07 12.5 8.5 10.93 8.5 9C8.5 7.07 10.07 5.5 12 5.5ZM18.75 18V20H17.25V18C17.25 17.31 16.69 16.75 16 16.75H8C7.31 16.75 6.75 17.31 6.75 18V20H5.25V18C5.25 16.48 6.48 15.25 8 15.25H16C17.52 15.25 18.75 16.48 18.75 18Z" 
            fill="var(--_g-icon-fill-color)"
            stroke={strokeColor} 
        >
        </path>
        <path 
            d="M11.75 14C14.51 14 16.75 11.76 16.75 9C16.75 6.24 14.51 4 11.75 4C8.99 4 6.75 6.24 6.75 9C6.75 11.76 8.99 14 11.75 14ZM5 20V18C5 16.48 6.23 15.25 7.75 15.25H15.75C17.27 15.25 18.5 16.48 18.5 18V20H5Z" 
            fill="var(--_g-icon-fill-color)"
            stroke={strokeColor} 
        >
        </path>
    </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ className, width=24, height=24, fillColor='currentColor' }) => (
    <svg 
        className={className}
        width={width}
        height={height}
        viewBox="0 0 24 24" 
        fill={fillColor} 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true">
        <path 
            d="M18.0002 7H15.7502V5.75C15.7502 4.79 14.9702 4 14.0002 4H9.99023C9.03023 4 8.24023 
						4.78 8.24023 5.75V7H5.99023C4.89023 7 3.99023 7.89 3.99023 9V18C3.99023 19.1 4.88023 20 
						5.99023 20H17.9902C19.0902 20 19.9902 19.11 19.9902 18V9C19.9902 7.9 19.1002 7 17.9902 
						7H18.0002ZM9.75023 5.75C9.75023 5.61 9.86023 5.5 10.0002 5.5H14.0102C14.1502 5.5 14.2602 
						5.61 14.2602 5.75V7H9.76023V5.75H9.75023ZM18.5002 18.01C18.5002 18.28 18.2802 18.51 18.0002 
						18.51H6.00023C5.73023 18.51 5.50023 18.29 5.50023 18.01V9.01C5.50023 8.74 5.72023 8.51 6.00023 
						8.51H8.25023V10.01H9.75023V8.51H14.2502V10.01H15.7502V8.51H18.0002C18.2702 8.51 18.5002 8.73 
						18.5002 9.01V18.01Z" 
            fill="var(--_g-icon-fill-color)"
        >
        </path>
    </svg>
);

export const ContactIcon: React.FC<IconProps> = ({ className, width=16, height=16, fillColor='currentColor' }) => (
    <svg 
        className={className}
        width={width}
        height={height}
        viewBox="0 0 16 16" 
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
    >
        <path 
            d="M12 8.75H8.75V12H7.25V8.75H4V7.25H7.25V4H8.75V7.25H12V8.75Z" 
            fill="var(--_g-icon-fill-color)"
        >
        </path>
    </svg>
)

export const MenuToggle: React.FC<IconProps> = ({ className, width='24px', height='24px', fillColor='currentColor'}) => (
    <svg 
        className={className} 
        width={width}
        height={height}
        viewBox="0 0 24 24" 
        fill={fillColor} 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
    >
        <path 
            d="M20 6.5H4V5H20V6.5ZM20 11.25H4V12.75H20V11.25ZM20 17.5H4V19H20V17.5Z" 
            fill="var(--_g-icon-fill-color)">
        </path>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className, width='24px', height='24px', fillColor='white'}) => (
    <svg 
        className={className}
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" 
        width={width}
        height={height}
        viewBox="0 0 24 24" 
        fill={fillColor}
    >
        <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M10.4951 11.5557L5.02539 17.0254L6.08605 18.086L11.5557 12.6164L17.0254 18.0861L18.086 17.0254L12.6164 11.5557L18.086 6.08605L17.0254 5.02539L11.5557 10.4951L6.08605 5.0254L5.02539 6.08606L10.4951 11.5557Z" 
            fill="var(--_g-icon-stroke-color)"
        >
        </path>
    </svg>
);

export const AngleRightIcon: React.FC<IconProps> = ({ className, width='16px', height='16px', fillColor='currentColor'}) => (
    <svg 
        className={className} 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 16 16" 
        fill={fillColor}
    >
        <path 
            d="M6 12L10 8L6 4" 
            stroke="" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
        ></path>
    </svg>
)
