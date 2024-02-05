import { capitalize } from "lodash";
import React from "react";

import { useDisplayIsFooterExpanded } from "../../states/footer";
import {
  FooterSubItemType,
  subFooterItems,
  useDisplayFooterSubItems2,
} from "../../states/footer2";

export const SubfooterButtons = () => {
  return (
    <div className="fixed right-2 top-1/3 z-50 flex w-fit flex-col items-center gap-4">
      {subFooterItems.map((item, index) => {
        return (
          <React.Fragment key={item + index}>
            {createFooterSubItems(item)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const createFooterSubItems = (item: FooterSubItemType) => {
  const { footerSubItem, setFooterSubItem } = useDisplayFooterSubItems2();

  const { setIsFooterExpanded } = useDisplayIsFooterExpanded();

  const onClick = () => {
    setFooterSubItem(item);
    setIsFooterExpanded(true);
  };

  const isSelected = footerSubItem === item;

  return (
    <button
      onClick={() => onClick()}
      className={`h-12 w-full rounded-lg border-2 border-green-100 p-2 text-center shadow-lg ${
        isSelected ? "bg-greens-200" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center hover:backdrop-brightness-100">
        <p className={`text-variant-base whitespace-nowrap text-green-200`}>
          {capitalize(item)}
        </p>
      </div>
    </button>
  );
};
