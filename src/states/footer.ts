import { create } from "zustand";

export type FooterItems = "sunchaser" | "forecast" | "location" | "date";

export interface DisplayDrawerStates {
  footerItem: FooterItems;
  setFooterItem: (input: FooterItems) => void;
}

export const useDisplayFooter = create<DisplayDrawerStates>((set) => ({
  footerItem: "forecast",
  setFooterItem: (input: FooterItems) => set(() => ({ footerItem: input })),
}));
