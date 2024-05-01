import { Dispatch, SetStateAction } from 'react';

export interface CommentBtnProps {
  likes: number;
  isLike: boolean;
  commentId: number;
  postId?: number;
  parentId?: number;
  isClickedLike?: boolean;
  isMine?: boolean;
  setIsClickedLike?: Dispatch<SetStateAction<boolean | undefined>>;
  setLikes?: Dispatch<SetStateAction<number>>;
}
