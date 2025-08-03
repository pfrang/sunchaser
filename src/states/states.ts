"use client";
import { create } from "zustand";

export const useIsFilterOpen = create<{
  isFilterOpen: boolean;
  setIsFilterOpen: (input: boolean) => void;
}>((set) => ({
  isFilterOpen: false,
  setIsFilterOpen: (input: boolean) => set(() => ({ isFilterOpen: input })),
}));

export const useIsMapBeingTouched = create<{
  isMapBeingTouched: boolean;
  setIsMapBeingTouched: (input: boolean) => void;
}>((set) => ({
  isMapBeingTouched: false,
  setIsMapBeingTouched: (input: boolean) =>
    set(() => ({ isMapBeingTouched: input })),
}));

export const useIsSettingsOpen = create<{
  isSettingsOpen: boolean;
  setIsSettingsOpen: (input: boolean) => void;
}>((set) => ({
  isSettingsOpen: false,
  setIsSettingsOpen: (input: boolean) => set(() => ({ isSettingsOpen: input })),
}));

export const useIsSliding = create<{
  isSliding: boolean;
  setIsSliding: (input: boolean) => void;
}>((set) => ({
  isSliding: false,
  setIsSliding: (input: boolean) => set(() => ({ isSliding: input })),
}));
