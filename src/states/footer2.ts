"use client";
import { create } from "zustand";
import { Footer } from "react-day-picker";

export const footerItems = ["sunchaser", "forecast", "calendar"] as const;
export type FooterItemType = (typeof footerItems)[number];

export interface DisplayDrawerStates {
  footerItem: FooterItemType;
  setFooterItem: (input: FooterItemType) => void;
}

export const useDisplayFooter2 = create<DisplayDrawerStates>((set) => ({
  footerItem: "forecast",
  setFooterItem: (input: FooterItemType) => set(() => ({ footerItem: input })),
}));
