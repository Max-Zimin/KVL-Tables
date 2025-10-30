import React, { createContext, useRef, type ReactNode} from 'react';
import type { TypeScreenshotContext } from '../types/types';



const ScreenshotContext = createContext<TypeScreenshotContext | null>(null);

export const ScreenshotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const areaRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScreenshotContext.Provider value={{ areaRef }}>
      {children}
    </ScreenshotContext.Provider>
  );
};

export default ScreenshotContext;
