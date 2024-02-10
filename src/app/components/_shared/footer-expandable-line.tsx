import { SwipeableHandlers } from "react-swipeable";

interface FooterExpandableLineProps {
  expandableClick: () => void;
  expandableSwipe: SwipeableHandlers;
}

export const FooterExpandableLine = ({
  expandableClick,
  expandableSwipe,
}: FooterExpandableLineProps) => {
  return (
    <div className="flex h-10 w-full justify-center" {...expandableSwipe}>
      <div
        className="mt-2 w-[25px] cursor-pointer pb-2 pt-1 sm:w-[40px]"
        onClick={() => expandableClick()}
      >
        <span className="block h-1 rounded-sm bg-blues-200 shadow-custom-minor"></span>
      </div>
    </div>
  );
};
