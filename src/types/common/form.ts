import { Dispatch, SetStateAction } from 'react';

export type FormType = {
  postId?: number;
  category?: number;
  title?: string;
  content?: string;
  images?: string[] | null;
  isPost?: boolean;
  isPostDetail?: boolean;
  isReview?: boolean;
  setIsSheetOpen?: Dispatch<SetStateAction<boolean>>;
  editHandler?: () => void;
};
