import { useSwipeable } from "react-swipeable";
import { ConfigurationOptions } from "react-swipeable/es/types";

interface UseSwipeable {
  onSwipedUp: () => void;
  onSwipedDown: () => void;
  config?: ConfigurationOptions;
}

const defaultConfig: Partial<ConfigurationOptions> = {
  preventScrollOnSwipe: true,
  trackMouse: true,
};

export const useUseSwipeable = (props: UseSwipeable) => {
  const handlers = useSwipeable({
    ...defaultConfig,
    ...props,
  });

  return handlers;
};
