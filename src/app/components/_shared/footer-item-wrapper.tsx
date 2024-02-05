import { Collapse } from "@mui/material";

import { useDisplayIsFooterExpanded } from "../../../states/footer";
import { useDisplayFooter2 } from "../../../states/footer2";
import { useUseSwipeable } from "../../hooks/use-swipeable";

export const FooterItemWrapper = ({ children, item }) => {
  const { isFooterExpanded, setIsFooterExpanded } =
    useDisplayIsFooterExpanded();
  const { footerItem } = useDisplayFooter2();
  const shouldExpand = item === footerItem && isFooterExpanded;

  const handlers = useUseSwipeable({
    onSwipedUp: () => setIsFooterExpanded(true),
    onSwipedDown: () => setIsFooterExpanded(false),
  });

  return (
    <div className="fixed bottom-0 z-50 w-full rounded-custom border-2 border-green-100 bg-white pr-1">
      <div className="mt-2 flex w-full justify-center" {...handlers}>
        <div
          className="w-[25px] cursor-pointer pb-2 pt-1 sm:w-[40px]"
          onClick={() => setIsFooterExpanded(!isFooterExpanded)}
        >
          <span className="block h-1 rounded-sm bg-blues-200 shadow-custom-minor"></span>
        </div>
      </div>
      <Collapse
        style={{
          width: "100%",
        }}
        in={shouldExpand}
      >
        <div className="h-[250px] w-full overflow-y-scroll scrollbar-thin scrollbar-track-slate-50">
          {children}
        </div>
      </Collapse>
    </div>
  );
};
