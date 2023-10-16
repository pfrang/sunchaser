import { create } from "zustand";

type NavItem = "weather" | "location" | "result" | "date";

export interface DisplayDrawerStates {
  footerItem: NavItem;
  setFooterItem: (input: NavItem) => void;
}

export const useDisplayFooter = create<DisplayDrawerStates>((set) => ({
  footerItem: "weather",
  setFooterItem: (input: NavItem) => set(() => ({ footerItem: input })),
}));
