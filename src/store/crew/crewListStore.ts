import { UseCrewListsStateProps } from '@/types/crew/crewList';
import { create } from 'zustand';

export const useCrewListState = create<UseCrewListsStateProps>(set => ({
  categoryId: 1,
  setCategoryId: id => set({ categoryId: id }),
}));

export const useMemberListState = create<UseCrewListsStateProps>(set => ({
  categoryId: 1,
  setCategoryId: id => set({ categoryId: id }),
}));

