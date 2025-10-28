import { useContext } from 'react';
import ScreenshotContext from './components/ScreenshotProvider';


export const useScreenshot = () => {
  const context = useContext(ScreenshotContext);
  if (!context) {
    throw new Error('useScreenshot must be used within ScreenshotProvider');
  }
  return context;
};