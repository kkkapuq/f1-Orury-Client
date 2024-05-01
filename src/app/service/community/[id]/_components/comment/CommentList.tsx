'use client';

import { v4 } from 'uuid';
import { useMemo, useState } from 'react';
import { CommentProps } from '@/types/community/comment';

import useIntersect from '@/hooks/common/useIntersection';
import OneComment from '@/app/service/community/[id]/_components/comment/OneComment';
import useCommentListApi from '@/hooks/community/useCommentList';

function CommentList({ postId }: { postId: number }) {
  const [commentList, setCommentList] = useState<CommentProps[] | undefined>(
    [],
  );

  const { data, size, setSize, isValidating } =
    useCommentListApi.useGetCommentList(postId);

  useMemo(() => {
    setCommentList(data?.flatMap(page => page.data.data.comments));
  }, [data, setCommentList]);

  const bottomRef = useIntersect(() => {
    if (
      !isValidating &&
      data &&
      data[data.length - 1].data.data.cursor !== -1
    ) {
      setSize(size + 1);
    }
  });

  return (
    <div className="bg-white flex justify-between flex-col mx-4 rounded-lg">
      <ul className="pb-12">
        {commentList?.map(comment => (
          <OneComment key={v4()} post_id={postId} {...comment} />
        ))}
        <div ref={bottomRef} />
      </ul>
    </div>
  );
}

export default CommentList;
