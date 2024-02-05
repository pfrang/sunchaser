"use client";
import { create } from "zustand";

export const footerItems = ["forecast", "sunchaser"] as const;
export const subFooterItems = ["result", "calendar"] as const;

export type FooterItemType = (typeof footerItems)[number];
export type FooterSubItemType = (typeof subFooterItems)[number];

export interface DisplayDrawerStates {
  footerItem: FooterItemType;
  setFooterItem: (input: FooterItemType) => void;
}

export const useDisplayFooter2 = create<DisplayDrawerStates>((set) => ({
  footerItem: "forecast",
  setFooterItem: (input: FooterItemType) => set(() => ({ footerItem: input })),
}));

export interface DisplayDrawerSubItemsStates {
  footerSubItem: FooterSubItemType;
  setFooterSubItem: (input: FooterSubItemType) => void;
}

export const useDisplayFooterSubItems2 = create<DisplayDrawerSubItemsStates>(
  (set) => ({
    footerSubItem: "result",
    setFooterSubItem: (input: FooterSubItemType) =>
      set(() => ({ footerSubItem: input })),
  }),
);
