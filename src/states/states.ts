"use client";
import { create } from "zustand";

export const useDisplayIsFooterExpanded = create<{
  isFooterExpanded: boolean;
  setIsFooterExpanded: (input: boolean) => void;
}>((set) => ({
  isFooterExpanded: false,
  setIsFooterExpanded: (input: boolean) =>
    set(() => ({ isFooterExpanded: input })),
}));

export const useIsFilterOpen = create<{
  isFilterOpen: boolean;
  setIsFilterOpen: (input: boolean) => void;
}>((set) => ({
  isFilterOpen: false,
  setIsFilterOpen: (input: boolean) => set(() => ({ isFilterOpen: input })),
}));

export const useIsSliding = create<{
  isSliding: boolean;
  setIsSliding: (input: boolean) => void;
}>((set) => ({
  isSliding: false,
  setIsSliding: (input: boolean) => set(() => ({ isSliding: input })),
}));

export const resetLayout = () => {
  useDisplayIsFooterExpanded.setState({ isFooterExpanded: false });
};
