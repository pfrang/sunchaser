import { useSwipeable } from "react-swipeable";
import { ConfigurationOptions, SwipeableProps } from "react-swipeable/es/types";

// Swipeable docs https://formidablelabs.github.io/react-swipeable/

interface UseSwipeable extends SwipeableProps {}

const defaultConfig: Partial<ConfigurationOptions> = {
  trackMouse: true,
  preventScrollOnSwipe: true,
  swipeDuration: 500,
};

export const useUseSwipeable = (props: UseSwipeable) => {
  const softSwipe = 1.2;
  const handlers = useSwipeable({
    // swipeDuration: 200,
    ...defaultConfig,

    onSwipedUp: (eventData) => {
      if (eventData.velocity > softSwipe) {
        if (props.onSwipedUp) props.onSwipedUp(eventData);
      }
    },
    onSwipedDown: (eventData) => {
      if (eventData.velocity > softSwipe) {
        if (props.onSwipedDown) props.onSwipedDown(eventData);
      }
    },
  });

  return handlers;
};
