import { SwipeableHandlers } from "react-swipeable";

interface FooterExpandableLineProps {
  expandableClick: () => void;
}

export const FooterExpandableLine = ({
  expandableClick,
}: FooterExpandableLineProps) => {
  return (
    <div
      className="flex size-full h-10 justify-center bg-gray-100"
      onClick={() => expandableClick()}
    >
      <div className="mt-2 w-[25px] cursor-pointer pb-2 pt-1 sm:w-[40px]">
        <span className="block h-1 rounded-sm bg-blues-200 shadow-custom-minor"></span>
      </div>
    </div>
  );
};
