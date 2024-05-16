export interface UserProps {
  userProfileImage: string;
  userNickname: string;
  createdAt: string;
  userId?: number;
  postId?: number;
  commentId?: number;
  parentId?: number;
  isLike?: boolean;
  likeCount?: number;
  commentCount?: number;
  hasButton?: boolean;
  isMine?: boolean;
}
