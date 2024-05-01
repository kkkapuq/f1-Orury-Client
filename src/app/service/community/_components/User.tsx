'use client';

import Image from 'next/image';
import getTimeDiff from '@/utils/getTimeDiff';
import useUserStore from '@/store/user/userStore';

import { COLOR } from '@/styles/color';
import { UserProps } from '@/types/community/user';
import { MessageCircle } from 'lucide-react';

function User({ ...props }: UserProps) {
  const { id } = useUserStore();
  const { userProfileImage, userNickname, createdAt, commentCount, userId } =
    props;

  const renderCommentCount = (commentCount?: number) => {
    if (commentCount) {
      return (
        <div className="flex gap-[2px]">
          <MessageCircle
            size={12}
            strokeWidth={2.5}
            color={COLOR.primary}
            className="mt-[2px]"
          />
          <span className="text-primary text-xs">{commentCount}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-2">
        {userProfileImage && (
          <Image
            src={userProfileImage}
            alt="image"
            width={36}
            height={36}
            className="rounded-full h-9"
          />
        )}

        <div className="flex flex-col">
          <div className="flex gap-1">
            <span className="text-sm font-semibold">{userNickname}</span>
            <span className="text-sm text-grey-500">{`#${userId || id}`}</span>
          </div>
          <div className="flex gap-[6px]">
            <span className="text-xs text-grey-500">
              {getTimeDiff(createdAt)}
            </span>
            <div className="flex gap-[2px]">
              {renderCommentCount(commentCount)}
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}

export default User;
