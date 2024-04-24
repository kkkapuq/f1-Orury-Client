import { create } from 'zustand';

export interface BottomSheetStore {
  isSheetOpen: boolean;
  setIsSheetOpen: (isOpen: boolean) => void;
}

const useBottomSheetStore = create<BottomSheetStore>(set => ({
  isSheetOpen: false,
  setIsSheetOpen: isOpen => set({ isSheetOpen: isOpen }),
}));

export default useBottomSheetStore;
