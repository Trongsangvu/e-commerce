import { useState } from 'react';

export const Search: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
        <div className="fixed w-[500px] top-[10%] left-[51%] border rounded-sm bg-white border-gray-300 shadow-md transition-all duration-300 ease-in-out z-50">
            <div className="flex  mx-auto px-[16px] pt-[16px] pb-8">
                <form action="">
                    <div className="border-0 border-b-2 border-b-amber-400">
                        <input 
                            type="text" 
                            placeholder="Search..."
                            className="w-[400px] p-2 outline-none"
                        />
                    </div>
                </form>
                <button 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`relative cursor-pointer font-normal text-lg inline-block underline-offset-4 ml-[11px]
                        ${isHovered ? 'none' : 'underline'}    
                    `}
                    >
                    <span>Cancel</span>
                    <span 
                        className={`absolute left-0 bottom-2 h-2 bg-black transition-all duration-300
                            ${isHovered ? 'w-full' : 'w-0'}    
                        `}
                    ></span>
                </button>
            </div>
        </div>
    )
}

