import { create } from "zustand";

export const useSContextStore = create((set) => ({
  activeIndex: 1,
  setActiveIndex: (index: number) => set({ activeIndex: index }),
}));
