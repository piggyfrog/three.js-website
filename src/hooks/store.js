import { t } from "i18next";
import { create } from "zustand";
import * as THREE from "three";

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

export const usePlayerLocationStore = create((set) => ({
  shouldSave: false,
  shouldLoad: false,
  playerLocation: new THREE.Vector3(0, 0, 0),
  setShouldSave: (value) => set({ shouldSave: value }),
  setShouldLoad: (value) => set({ shouldLoad: value }),
  setPlayerLocation: (value) => set({ playerLocation: value }),
}));

export const useLockCameraStore = create((set) => ({
  lockCamera: false,
  setLockCamera: (value) => set({ lockCamera: value }),
}));

export const useActionStore = create((set) => ({
  action: "",
  setAction: (value) => set({ action: value }),
}));
