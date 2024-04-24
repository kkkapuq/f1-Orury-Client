export interface UseCrewListsStateProps {
  categoryId: number;
  setCategoryId: (value: number) => void;
}

export interface UseCrewListItemProps {
  id: number;
  capacity: number;
  created_at: Date;
  icon: string;
  member_count: number;
  name: string;
  region: string[];
  tags: string[];
  updated_at: string;
  user_images: string[];
}

export type CrewListData = {
  content: UseCrewListItemProps[];
  pageable: {
    page_number: number;
    page_size: number;
    sort: any[];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  total_pages: number;
  total_elements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any[];
  number_of_elements: number;
  first: boolean;
  empty: boolean;
};
