import { useCallback, useRef } from "react";

/**
 * Hook để throttle click events, tránh double-click
 * @param onClick - Callback function được gọi khi click
 * @param throttleMs - Thời gian throttle (mặc định 300ms)
 * @returns Throttled click handler
 */
export const useThrottledClick = (
  onClick?: () => void,
  throttleMs: number = 300
): (() => void) | undefined => {
  const lastClickTimeRef = useRef<number>(0);

  return useCallback(() => {
    if (!onClick) return;

    const now = Date.now();
    if (now - lastClickTimeRef.current < throttleMs) {
      return;
    }

    lastClickTimeRef.current = now;
    onClick();
  }, [onClick, throttleMs]);
};
