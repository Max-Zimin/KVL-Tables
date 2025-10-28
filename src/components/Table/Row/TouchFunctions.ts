import { useRef, useCallback, useEffect } from "react";
import type { TColsNames } from "../../../types";

interface UseLongPressOptions {
  onLongPress: (rowIndex: number, gameIndex: number, gameName: TColsNames, e: React.TouchEvent<Element>) => void;
  delay?: number;
  isMobileOnly?: boolean;
}

export const useLongPress = ({ onLongPress, delay = 500, isMobileOnly = false }: UseLongPressOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleTouchStart = useCallback(
    (rowIndex: number, gameIndex: number, gameName: TColsNames, e: React.TouchEvent<Element>) => {
      if (!isMobileOnly || window.matchMedia("(max-width: 768px)").matches) {
        timerRef.current = setTimeout(() => onLongPress(rowIndex, gameIndex, gameName, e), delay);
      }
    },
    [onLongPress, delay, isMobileOnly]
  );

  const handleTouchEnd = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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
