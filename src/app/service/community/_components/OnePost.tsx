'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { OnePostProps } from '@/types/community/post';
import { Eye, MessageCircleMore, ThumbsUp } from 'lucide-react';
import clsx from 'clsx';
import getTimeDiff from '@/utils/getTimeDiff';
import Category from '@/app/service/community/_components/Category';

function OnePost({ ...props }: OnePostProps) {
  const {
    id,
    title,
    content,
    thumbnail_image,
    user_id,
    post_id,
    user_nickname,
    created_at,
    view_count,
    category,
    like_count,
    comment_count,
  } = props;
  const timeDiff = getTimeDiff(created_at);
  const divClassName = (thumbnail_image: string | null) => {
    return clsx('flex flex-col', {
      'justify-between': thumbnail_image,
      'justify-end': !thumbnail_image,
    });
  };

  return (
    <li>
      <Link
        href={`/service/community/${post_id || id || user_id}`}
        className="flex flex-col justify-between py-3 border border-grey-300 p-4 mb-2"
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-3 max-w-[calc(100%-88px)]">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2 pb-5">
                <Category category={category} />
                <div className="text-sm font-bold mt-[2px] line-clamp-1">
                  {title}
                </div>
                <div className="text-xs mt-1 whitespace-normal line-clamp-2 text-[#444] leading-[14px]">
                  {content}
                </div>
              </div>
            </div>
          </div>

          {thumbnail_image && (
            <Image
              src={thumbnail_image}
              alt="image"
              width={80}
              height={80}
              className="rounded-lg h-20"
            />
          )}
        </div>

        <hr className="pb-2" />

        <div className={divClassName(thumbnail_image)}>
          <div className="flex flex-col">
            <div className="flex justify-end gap-2">
              <div className="flex text-xs gap-[2px] leading-none text-center">
                <Eye size={12} color="#000" />
                {view_count}
              </div>
              <div className="flex text-xs gap-[2px] leading-none text-center">
                <ThumbsUp size={12} color="#000" />
                {like_count}
              </div>
              <div className="flex text-xs gap-[2px] leading-none text-center">
                <MessageCircleMore size={12} color="#000" />
                {comment_count}
              </div>
            </div>
            <div className="flex text-xs text-grey-300 leading-[14px] justify-end pt-2">
              <span>{user_nickname}</span>
              <span>
                &nbsp;
                {`#${user_id}`}
              </span>
              <span>&nbsp;/&nbsp;</span>
              <span>{timeDiff}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default OnePost;
