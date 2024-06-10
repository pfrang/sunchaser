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

export const useDisplayIsFooterExpanded = create<{
  isFooterExpanded: boolean;
  setIsFooterExpanded: (input: boolean) => void;
}>((set) => ({
  isFooterExpanded: false,
  setIsFooterExpanded: (input: boolean) =>
    set(() => ({ isFooterExpanded: input })),
}));

export const useDisplayFooter = create<DisplayDrawerStates>((set) => ({
  footerItem: "sunchaser",
  setFooterItem: (input: FooterItemType) => set(() => ({ footerItem: input })),
}));

export interface DisplayDrawerSubItemsStates {
  footerSubItem: FooterSubItemType;
  setFooterSubItem: (input: FooterSubItemType) => void;
}

export const useDisplayFooterSubItems = create<DisplayDrawerSubItemsStates>(
  (set) => ({
    footerSubItem: "result",
    setFooterSubItem: (input: FooterSubItemType) =>
      set(() => ({ footerSubItem: input })),
  }),
);

export const resetLayout = () => {
  useDisplayIsFooterExpanded.setState({ isFooterExpanded: false });
};
