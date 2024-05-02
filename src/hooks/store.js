import { t } from "i18next";
import { create } from "zustand";

export const useDialogStore = create((set) => ({
  isOpen: false,
  dialogID: "",
  setOpen: (value) => {
    set({ isOpen: false });
    set({ isOpen: true, dialogID: value });
  },
  setDialogID: (value) => set({ dialogID: value }),
  setClose: () => set({ isOpen: false }),
}));

export const useGameStateStore = create((set) => ({
  gameState: [],
  setGameState: (value) => {
    set((state) => {
      if (!state.gameState.includes(value)) {
        return { gameState: [...state.gameState, value] };
      }
      return state;
    });
  },
}));
