
type IconProps = {
    className?: string;
    width?: number;
    height?: number;   
    strokeColor?: string; 
    fillColor?: string;
}
// , fillColor='white'
export const LogoIcon:React.FC<IconProps> = ({ className, width=133, height=17 }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        width={width} 
        height={height} 
        viewBox="0 0 133 17">
        <image 
            xlinkHref="data:image/png;base64,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" 
            x="0" 
            y="0" 
            width={width} 
            height={height}
        />
    </svg> 
);

export const SearchIcon:React.FC<IconProps> = ({ className, width=24, height=24, fillColor='white' }) => (
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

export const SearchProductIcon:React.FC<IconProps> = ({ className, width=16, height=16, fillColor='currentColor' }) => (
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


export const UserIcon:React.FC<IconProps> = ({ className, width=24, height=24, fillColor='none', strokeColor='white' }) => (
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
            d="M11.75 14C14.51 14 16.75 11.76 16.75 9C16.75 6.24 14.51 4 11.75 4C8.99 4 6.75 6.24 6.75 9C6.75 11.76 8.99 14 11.75 14ZM5 20V18C5 16.48 6.23 15.25 7.75 15.25H15.75C17.27 15.25 18.5 16.48 18.5 18V20H5Z" 
            fill="var(--_g-icon-fill-color)"
            stroke={strokeColor} 
            strokeWidth={1.3} 
        >
        </path>
    </svg>
);

export const ShoppingCartIcon:React.FC<IconProps> = ({ className, width=24, height=24, fillColor='#fff' }) => (
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

export const ContactIcon:React.FC<IconProps> = ({ className, width=16, height=16, fillColor='currentColor' }) => (
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

export const MenuToggle:React.FC<IconProps> = ({ className, width='24px', height='24px', fillColor='#fff'}) => (
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

export const CloseIcon:React.FC<IconProps> = ({ className, width='24px', height='24px', fillColor='white'}) => (
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

export const AngleRightIcon:React.FC<IconProps> = ({ className, width='16px', height='16px', fillColor='currentColor'}) => (
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
);

export const AddressIcon:React.FC<IconProps> = ({ width= '', height= '' }) => (
    <svg 
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512">
        <path 
            d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/>
    </svg>
);

export const EyeSlashIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 640 512">
        <path 
            d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className, width=16, height=16, fillColor='#b4b4b9' }) => (
    <svg 
        className={className}
        width={width}
        height={height}
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512">
        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
    </svg>
);

export const IgIcon: React.FC<IconProps> = ({ className, width=16, height=16, fillColor='#b4b4b9' }) => (
    <svg 
        className={className}
        width={width} 
        height={height}
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
    </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className, width=16, height=16, fillColor='#b4b4b9' }) => (
    <svg 
        className={className}
        width={width}
        height={height}
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
);

export const CircleExcelIcon: React.FC<IconProps> = ({ width=24, height=24 }) => (
    <svg  
        xmlns="http://www.w3.org/2000/svg"  
        width={width}  
        height={height}  
        viewBox="0 0 24 24"  
        fill="none"  
        stroke="currentColor"  
        strokeWidth="1"  
        strokeLinecap="round"  
        strokeLinejoin="round"  
        className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path 
        stroke="none" 
        d="M0 0h24v24H0z" 
        fill="none"
    />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 9v4" />
        <path d="M12 16v.01" />
    </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ width=24, height=24 }) => (
    <svg 
        width={width}
        height={height}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M24.0003 12.2724C24.0003 11.4215 23.9223 10.6033 23.7776 9.81787H12.2451V14.4596H18.8351C18.5513 15.9596 17.6886 17.2305 16.3917 18.0814V21.0923H20.349C22.6644 19.0032 24.0003 15.9269 24.0003 12.2724Z" 
                fill="#4285F4"
            ></path>
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M12.2445 23.9999C15.5507 23.9999 18.3225 22.9254 20.3484 21.0927L16.3911 18.0818C15.2946 18.8018 13.892 19.2272 12.2445 19.2272C9.05527 19.2272 6.35582 17.1164 5.39292 14.28H1.302V17.3891C3.31685 21.3108 7.45787 23.9999 12.2445 23.9999Z" 
                fill="#34A853"
            ></path>
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M5.39334 14.2796C5.14844 13.5596 5.00929 12.7905 5.00929 11.9996C5.00929 11.2087 5.14844 10.4396 5.39334 9.71965V6.6106H1.30242C0.4731 8.23057 0 10.0633 0 11.9996C0 13.936 0.4731 15.7687 1.30242 17.3886L5.39334 14.2796Z" 
                fill="#FBBC05"
            ></path>
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M12.2445 4.77267C14.0423 4.77267 15.6564 5.37811 16.9254 6.56719L20.4375 3.12541C18.3169 1.18908 15.5451 0 12.2445 0C7.45787 0 3.31685 2.68906 1.302 6.61082L5.39292 9.71987C6.35582 6.88355 9.05527 4.77267 12.2445 4.77267Z" 
                fill="#EA4335"
            ></path>
        </g>
    </svg>
)
