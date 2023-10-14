import { create } from "zustand";

export interface DisplayDrawerStates {
  drawerIsOpen: boolean;
  setOpenDrawer: (input: boolean) => void;
}

export const useDisplayDrawer = create<DisplayDrawerStates>((set) => ({
  drawerIsOpen: false,
  setOpenDrawer: (input: boolean) => set(() => ({ drawerIsOpen: input })),
}));
