import { create } from "zustand";

export const usePlannerStore = create((set) => ({
  roof: "gamble",
  changeRoof: (roof: "gamble" | "backDrop") => set((state: any) => ({ roof })),
}));
