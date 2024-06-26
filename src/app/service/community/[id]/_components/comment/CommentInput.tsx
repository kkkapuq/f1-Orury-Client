'use client';

import postComment from '@/app/service/community/[id]/api/postComment';
import useCommentStore from '@/store/community/commentStore';
import useCommentListApi from '@/hooks/community/useCommentList';
import * as F from '@/app/_components/ui/form';

import { useEffect, useRef } from 'react';
import { Textarea } from '@/app/_components/ui/textarea';
import { Send } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { COLOR } from '@/styles/color';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CommentSchema,
  CommentSchemaType,
} from '@/app/service/community/[id]/schema';
import autoResize from '@/utils/autoResize';

function CommentInput() {
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {
    isReplyMode,
    setIsFocus,
    parentId,
    isFocus,
    setParentId,
    setIsReplyMode,
  } = useCommentStore();
  const { mutate } = useCommentListApi.useGetCommentList(postId);
  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
  });

  useEffect(() => {
    if (textAreaRef.current && isFocus) {
      textAreaRef.current.focus();
    }
  }, [isFocus, isReplyMode]);

  const onSubmit = useDebouncedCallback(async (data: CommentSchemaType) => {
    await postComment({
      content: data.content,
      parent_id: parentId,
      post_id: postId,
    });
    await mutate();

    form.setValue('content', '');
    setIsFocus(false);
    setIsReplyMode(false);
    setParentId(0);
  }, 300);

  const onBlurHandler = () => {
    setIsFocus(false);
    setIsReplyMode(false);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      autoResize(textAreaRef.current);
    }
  }, [form.watch('content')]);

  return (
    <section className="sticky bottom-14 left-0 mx-4">
      <F.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <F.FormField
            control={form.control}
            name="content"
            render={({ field: { onBlur, ref, ...field } }) => (
              <F.FormItem>
                <F.FormControl>
                  <Textarea
                    className="resize-none w-full py-[10px] pl-4 pr-10 rounded-xl outline-none bg-gradient-to-r from-gray-100 to-gray-100 placeholder:text-grey-300 caret-primary border-2 border-grey-100 focus:border-2 focus:border-primary"
                    placeholder="댓글을 입력하세요."
                    onKeyUp={e => autoResize(e.target as HTMLTextAreaElement)}
                    onKeyDown={e => autoResize(e.target as HTMLTextAreaElement)}
                    onBlur={onBlurHandler}
                    ref={textAreaRef}
                    rows={1}
                    maxLength={50}
                    {...field}
                  />
                </F.FormControl>
              </F.FormItem>
            )}
          />
          <button
            type="submit"
            className="absolute right-4 bottom-2 cursor-pointer"
          >
            <Send size={24} color={COLOR.black} />
          </button>
        </form>
      </F.Form>
    </section>
  );
}

export default CommentInput;
