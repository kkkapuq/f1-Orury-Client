import SORT_BY from '@/constants/crew/sortBy';
import { create } from 'zustand';

export interface UseSortByStateProps {
  selectedOption: typeof SORT_BY[keyof typeof SORT_BY];
  setSelectedOption: (option: typeof SORT_BY[keyof typeof SORT_BY]) => void;
}

export const useSortByState = create<UseSortByStateProps>(set => ({
  selectedOption: SORT_BY.recommend,
  setSelectedOption: option => set({ selectedOption: option }),
}));
