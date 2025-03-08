import { createContext } from 'react';
import { SidebarContextType } from '../types/sidebarContextTypes';

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);