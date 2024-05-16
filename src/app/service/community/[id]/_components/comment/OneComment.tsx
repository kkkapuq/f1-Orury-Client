/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useState } from 'react';
import { CornerDownRight } from 'lucide-react';
import { OneCommentType } from '@/types/community/comment';
import { COLOR } from '@/styles/color';

import clsx from 'clsx';
import User from '@/app/service/community/_components/User';
import Deleted from '@/app/service/community/[id]/_components/comment/Deleted';
import Content from '@/app/service/community/[id]/_components/comment/Content';
import useCommentStore from '@/store/community/commentStore';
import CommentButtons from '@/app/service/community/[id]/_components/comment/CommentButtons';
import Ellipsis from '@/app/_components/common/Ellipsis';

function OneComment({ ...props }: OneCommentType) {
  const { grey400, purple700 } = COLOR;
  const { isFocus, commentId, setParentId } = useCommentStore();
  const {
    parent_id,
    deleted,
    user_nickname,
    user_profile_image,
    created_at,
    like_count,
    is_like,
    id,
    content,
    post_id,
    is_mine,
    user_id,
  } = props;
  const [likes, setLikes] = useState(like_count);

  const liClassName = clsx('flex border-b', {
    'bg-purple-50': isFocus && commentId === id,
  });

  const iconClassName = clsx('h-[96px] pl-2', {
    'bg-grey-50': deleted,
    'bg-white': !deleted,
  });

  const handleMouseDown = () => setParentId(0);

  return (
    <li className={liClassName}>
      {parent_id ? (
        <CornerDownRight
          size={32}
          color={deleted ? grey400 : purple700}
          strokeWidth={1.5}
          className={iconClassName}
        />
      ) : null}
      <div className="flex flex-col w-full" onMouseDown={handleMouseDown}>
        {deleted ? (
          <Deleted />
        ) : (
          <div className="flex flex-col gap-2 p-[13.5px]">
            <div className="flex justify-between">
              <User
                userNickname={user_nickname}
                userProfileImage={user_profile_image}
                createdAt={created_at}
                likeCount={like_count}
                isLike={is_like}
                commentId={id}
                parentId={parent_id}
                postId={post_id}
                isMine={is_mine}
                userId={user_id}
              />
              <Ellipsis commentId={id} isMine={is_mine} />
            </div>
            <Content comment_id={id} post_id={post_id} content={content} />
            <CommentButtons
              commentId={id}
              postId={post_id}
              parentId={parent_id}
              isLike={is_like}
              likes={likes}
              setLikes={setLikes}
            />
          </div>
        )}
      </div>
    </li>
  );
}

export default OneComment;
