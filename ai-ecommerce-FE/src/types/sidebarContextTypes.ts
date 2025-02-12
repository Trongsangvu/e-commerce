export interface SidebarContextType {
    isOpen: boolean;
    handleClose: () => void;
    handleOpen: () => void;
}

export interface SidebarChildrenProps {
    children: React.ReactNode;
}