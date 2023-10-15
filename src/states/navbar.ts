import { create } from "zustand";

export interface DisplayDrawerStates {
  navbarIsOpen: boolean;
  setOpenNavbar: (input: boolean) => void;
}

export const useDisplayNavbar = create<DisplayDrawerStates>((set) => ({
  navbarIsOpen: false,
  setOpenNavbar: (input: boolean) => set(() => ({ navbarIsOpen: input })),
}));
