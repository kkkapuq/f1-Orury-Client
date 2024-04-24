import { Dispatch, SetStateAction } from 'react';

export interface BottomSheetProps {
  bottomSheetTitle: string;
  isSheetOpen: boolean;
  isPost?: boolean;
  setIsSheetOpen?: Dispatch<SetStateAction<boolean>>;
  onDisMiss: () => void;
  ContentComponent: React.ComponentType<any>;
}
