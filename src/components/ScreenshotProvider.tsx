import React, { createContext, useRef, type ReactNode, type RefObject } from 'react';

interface ScreenshotContextType {
  areaRef: RefObject<HTMLDivElement | null>;
}

const ScreenshotContext = createContext<ScreenshotContextType | null>(null);

export const ScreenshotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const areaRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScreenshotContext.Provider value={{ areaRef }}>
      {children}
    </ScreenshotContext.Provider>
  );
};

export default ScreenshotContext;
