import { useCallback } from "react";

export const useAnimatedHeight = (
  newHeight: number,
  footerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const updateDOMHeight = useCallback((newHeight: number) => {
    if (footerRef.current) {
      footerRef.current.style.height = `${newHeight + 40}px`;
    }
  }, []);

  const animateHeight = useCallback(
    (newHeight: number) => {
      if (footerRef.current) {
        footerRef.current.style.transition = "height 0.3s ease-out";
        updateDOMHeight(newHeight);

        setTimeout(() => {
          if (footerRef.current) {
            footerRef.current.style.transition = "";
          }
        }, 300);
      }
    },
    [updateDOMHeight],
  );

  return { animateHeight, updateDOMHeight };
};
