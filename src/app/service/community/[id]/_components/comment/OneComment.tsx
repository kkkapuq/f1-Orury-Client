'use client';

import { CornerDownRight } from 'lucide-react';
import { OneCommentType } from '@/types/community/comment';
import { COLOR } from '@/styles/color';

import clsx from 'clsx';
import User from '@/app/service/community/_components/User';
import Deleted from '@/app/service/community/[id]/_components/comment/Deleted';
import ModifyContent from '@/app/service/community/[id]/_components/comment/ModifyContent';
import useCommentStore from '@/store/community/commentStore';

function OneComment({ ...props }: OneCommentType) {
  const { grey400, purple700 } = COLOR;
  const { isFocus, commentId } = useCommentStore();
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
  } = props;

  const liClassName = clsx('flex border-b', {
    'bg-purple-50': isFocus && commentId === id,
    'bg-white': !isFocus || commentId !== id,
  });

  return (
    <li className={liClassName}>
      {parent_id ? (
        <CornerDownRight
          size={32}
          color={deleted ? grey400 : purple700}
          strokeWidth={1.5}
          className=" h-[96px] pl-2"
        />
      ) : null}
      <div className="flex flex-col w-full">
        {deleted ? (
          <Deleted />
        ) : (
          <div className="flex flex-col gap-2 p-[13.5px]">
            <User
              user_nickname={user_nickname}
              user_profile_image={user_profile_image}
              created_at={created_at}
              like_count={like_count}
              is_like={is_like}
              comment_id={id}
              parent_id={parent_id}
              post_id={post_id}
              hasButton
            />
            <ModifyContent
              comment_id={id}
              post_id={post_id}
              content={content}
            />
          </div>
        )}
      </div>
    </li>
  );
}

export default OneComment;