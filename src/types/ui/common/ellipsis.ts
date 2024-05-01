export interface EllipsisProps {
  isMine: boolean;
  isPost: boolean;
  isComment: boolean;
  commentId: number;
  onEditPost: () => void;
}
