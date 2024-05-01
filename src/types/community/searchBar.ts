import { Dispatch, SetStateAction } from 'react';

export interface SearchBarProps {
  onExit: () => void;
  searchText: string;
  isSearchingFocus: boolean;
  setIsSearchingFocus: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
}
