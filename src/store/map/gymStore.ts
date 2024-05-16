import { OneSearchKeywordType } from '@/types/map/map';
import { create } from 'zustand';

//* * AroundGymList zustand **//

type AroundGymListStore = {
  mapAroundGymList: OneSearchKeywordType[];
  setMapAroundGymList: (value: OneSearchKeywordType[]) => void;
};

export const useAroundGymListStore = create<AroundGymListStore>(set => ({
  mapAroundGymList: [],
  setMapAroundGymList: value => set({ mapAroundGymList: value }),
}));
