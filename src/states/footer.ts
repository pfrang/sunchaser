import { create } from "zustand";

export type FooterItems = "sunchaser" | "forecast";
export type FooterSubItems = "location" | "date" | "profile" | "map" | "result";

export const footerSubItemsSunchaser = [
  "location",
  "date",
  "profile",
  "result",
] as const;

export const footerSubItemsForecast = [
  "map",
  "date",
  "profile",
  "result",
] as const;

export interface DisplayDrawerStates {
  footerItem: FooterItems;
  setFooterItem: (input: FooterItems) => void;
}
export interface DisplayDrawerSubItemsStates {
  footerSubItem: FooterSubItems;
  setFooterSubItem: (input: FooterSubItems) => void;
}

export const useDisplayFooter = create<DisplayDrawerStates>((set) => ({
  footerItem: "forecast",
  setFooterItem: (input: FooterItems) => set(() => ({ footerItem: input })),
}));

export const useDisplayFooterSubItems = create<DisplayDrawerSubItemsStates>(
  (set) => ({
    footerSubItem: "location",
    setFooterSubItem: (input: FooterSubItems) =>
      set(() => ({ footerSubItem: input })),
  })
);
