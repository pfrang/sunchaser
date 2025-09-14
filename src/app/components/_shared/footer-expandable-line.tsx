interface FooterExpandableLineProps {
  expandableClick: () => void;
  fullExpand: () => void;
}

export const FooterExpandableLine = ({
  expandableClick,
  fullExpand,
}: FooterExpandableLineProps) => {
  return (
    <>
      <div
        className="relative flex size-full h-10 justify-center"
        onClick={() => expandableClick()}
      >
        <div className="mt-2 w-[25px] cursor-pointer pb-2 pt-1 sm:w-[40px]">
          <span className="block h-1 rounded-sm bg-blues-200 shadow-custom-minor"></span>
        </div>
      </div>
      <span
        onClick={() => fullExpand()}
        className="absolute right-10 z-20 block h-1 w-6 bg-blues-200"
      ></span>
    </>
  );
};
