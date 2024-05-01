'use client';

import useCommentStore from '@/store/community/commentStore';
import postCommentLike from '@/app/service/community/[id]/api/postCommentLike';
import deleteCommentLike from '@/app/service/community/[id]/api/deleteCommentLike';

import { useCallback, useState } from 'react';
import { MessageCircleMore, ThumbsUp } from 'lucide-react';
import { useToast } from '@/app/_components/ui/use-toast';
import { useDebouncedCallback } from 'use-debounce';
import type { CommentBtnProps } from '@/types/community/commentButtons';
import { COLOR } from '@/styles/color';

function CommentButtons({ ...props }: CommentBtnProps) {
  const { toast } = useToast();
  const { likes, isLike, commentId, isClickedLike, setLikes } = props;
  const [isClicked, setIsClicked] = useState(isLike);

  const { setCommentId, setIsFocus, setIsReplyMode, setParentId } =
    useCommentStore();

  const handleReply = () => {
    if (commentId) {
      setParentId(commentId);
      setCommentId(commentId);
    }

    setIsReplyMode(true);
    setIsFocus(true);
  };

  const handleLike = useDebouncedCallback(
    useCallback(async () => {
      setIsClicked(isClicked => !isClicked);

      const response = isClicked
        ? await deleteCommentLike({ comment_id: commentId })
        : await postCommentLike({ comment_id: commentId });

      if (response === 200) {
        if (setLikes) {
          setLikes(likes => (isClicked ? likes - 1 : likes + 1));
        }
      }
    }, [commentId, isClicked, toast]),
    300,
  );

  return (
    <div className="flex gap-2">
      {/* 좋아요 */}
      <button
        type="button"
        onClick={handleLike}
        className="flex items-center gap-1 transition ease-out"
      >
        <ThumbsUp
          color={COLOR.black}
          fill={isClicked ? COLOR.primary : COLOR.white}
          size={12}
        />

        <span className="text-[11px] leading-tight">좋아요</span>
        <span className="text-[11px] leading-tight">{likes}</span>
      </button>

      {/* 답글 */}
      <button
        type="button"
        onClick={handleReply}
        className="flex items-center gap-1"
      >
        <MessageCircleMore
          size={12}
          color="#000"
          fill={isClickedLike ? '#96A2AC' : '#fff'}
        />
        <span className="text-[11px] leading-tight">답글쓰기</span>
      </button>
    </div>
  );
}

export default CommentButtons;
