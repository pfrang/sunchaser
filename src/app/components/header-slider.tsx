import { capitalize } from "lodash";
import React from "react";

import {
  FooterItemType,
  footerItems,
  useDisplayFooter2,
} from "../../states/footer2";

export const HeaderSlider = () => {
  return (
    <div className="fixed left-2 top-16 z-50 flex w-fit  items-center gap-4">
      {footerItems.map((item, index) => {
        return (
          <React.Fragment key={item + index}>
            {createFooterSubItems(item)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const createFooterSubItems = (item: FooterItemType) => {
  const { footerItem, setFooterItem } = useDisplayFooter2();

  const onClick = () => {
    setFooterItem(item);
  };

  const isSelected = footerItem === item;

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
