import { useSwipeable } from "react-swipeable";
import { ConfigurationOptions, SwipeableProps } from "react-swipeable/es/types";

interface UseSwipeable extends SwipeableProps {}

const defaultConfig: Partial<ConfigurationOptions> = {
  preventScrollOnSwipe: true,
  trackMouse: true,
};

export const useUseSwipeable = (props: UseSwipeable) => {
  const handlers = useSwipeable({
    ...defaultConfig,
    ...props,
    onSwipedUp: (eventData) => {
      if (eventData.velocity > 0.5) {
        if (props.onSwipedUp) props.onSwipedUp(eventData);
      }
    },
    onSwipedDown: (eventData) => {
      if (eventData.velocity > 0.5) {
        if (props.onSwipedDown) props.onSwipedDown(eventData);
      }
    },
  });

  return handlers;
};
