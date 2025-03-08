import React, { useState } from 'react';
import { SidebarChildrenProps } from '../types/sidebarContextTypes';
import { SidebarContext } from '../providers/sidebarContext';
// export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarChildrenProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpen = () => {
        setIsOpen(prevState => !prevState);
    }

    const handleClose = () => {
        setIsOpen(prevState => !prevState);
    }

    return (
        <SidebarContext.Provider value={{ isOpen, handleClose, handleOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}
