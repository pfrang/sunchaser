import { useSwipeable } from "react-swipeable";
import { ConfigurationOptions, SwipeableProps } from "react-swipeable/es/types";

// Swipeable docs https://formidablelabs.github.io/react-swipeable/

interface UseSwipeable extends SwipeableProps {}

const defaultConfig: Partial<ConfigurationOptions> = {
  trackTouch: true,
  trackMouse: true,
  swipeDuration: 250,
  touchEventOptions: {
    passive: false,
  },
  // preventScrollOnSwipe: true,
};

export const useUseSwipeable = (props: UseSwipeable) => {
  const softSwipe = 1;

  const handlers = useSwipeable({
    ...defaultConfig,
    ...props,
    // onTouchStartOrOnMouseDown: (eventData) => {
    //   eventData.event.preventDefault();
    // },
    onSwiping: (eventData) => {
      if (eventData.velocity > softSwipe) {
        eventData.event.preventDefault();
      }
    },
    // onSwipeStart: (eventData) => {
    //   // prevent scroll behaviour
    //   eventData.event.stopPropagation();
    //   eventData.event.preventDeault();
    // },
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
