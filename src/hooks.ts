import { useContext, useRef } from "react";
import ScreenshotContext from "./components/ScreenshotProvider";
import { useCallback, useEffect } from "react";
import type { IUseLongPressOptions } from "./types/hooksTypes";
import type { TypeColsNames } from "./types/types";

export const useScreenshot = () => {
  const context = useContext(ScreenshotContext);
  if (!context) {
    throw new Error("useScreenshot must be used within ScreenshotProvider");
  }
  return context;
};

export const useLongPress = ({ onLongPress, delay = 500 }: IUseLongPressOptions) => {
  const hasTouch = "ontouchstart" in window;

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const handleTouchStart = useCallback(
    (rowIndex: number, gameIndex: number, gameName: TypeColsNames, e: React.TouchEvent<Element>) => {
      if (hasTouch) {
        timerRef.current = setTimeout(() => onLongPress(rowIndex, gameIndex, gameName, e), delay);
      }
    },
    [onLongPress, delay, hasTouch]
  );

  const handleTouchEnd = useCallback(() => {
    if (hasTouch && timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [hasTouch]);

  const handleTouchMove = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { handleTouchStart, handleTouchEnd, handleTouchMove };
};
