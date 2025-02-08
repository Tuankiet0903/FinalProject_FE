import React, { createContext, useContext, useState } from 'react';
import { LAYOUT } from '../../utils/constants';
const DEFAULT_WIDTH = LAYOUT.DEFAULT_SIDEBAR_WIDTH;

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);

  return (
    <SidebarContext.Provider value={{ sidebarWidth, setSidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};