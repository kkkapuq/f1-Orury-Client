'use client';

import * as M from '@/app/_components/ui/menubars';
import Modal from '@/app/_components/common/Modal';
import deletePost from '@/app/service/community/[id]/api/deletePost';
import deleteComment from '@/app/service/community/[id]/api/deleteComment';
import usePostListApi from '@/hooks/community/usePostList';
import useCommentListApi from '@/hooks/community/useCommentList';
import useCommentStore from '@/store/community/commentStore';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { MODAL } from '@/constants/ui/common/modal';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useParams } from 'next/navigation';
import { usePostsState } from '@/store/community/postsStore';
import { useToast } from '@/app/_components/ui/use-toast';

import { EllipsisProps } from '@/types/ui/common/ellipsis';

function Ellipsis({ ...props }: Partial<EllipsisProps>) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { post, comment } = MODAL.deleteCommunity;
  const { toast } = useToast();
  const { isPost, isComment, commentId, onEditPost, isMine } = props;
  const { categoryId } = usePostsState();
  const { mutate: mutatePostList } = usePostListApi.useGetPostList(categoryId);
  const { mutate: mutateCommentList } =
    useCommentListApi.useGetCommentList(postId);
  const { setCommentId, triggerModify, setTriggerModify, setIsEditMode } =
    useCommentStore();

  const handleCancel = () => {
    setOpenDeleteModal(openDeleteModal => !openDeleteModal);
  };

  const handleDeletePost = useDebouncedCallback(async () => {
    const message = await deletePost({ postId });
    await mutatePostList();
    setOpenDeleteModal(openDeleteModal => !openDeleteModal);

    router.back();
    toast({ variant: 'success', description: message, duration: 2000 });
  }, 300);

  const handleDeleteComment = useDebouncedCallback(async () => {
    if (commentId) await deleteComment({ commentId });
    await mutateCommentList();
    setOpenDeleteModal(openDeleteModal => !openDeleteModal);
    toast({
      title: '댓글 삭제',
      description: '댓글이 삭제되었습니다.',
      variant: 'warning',
      duration: 2000,
    });
  }, 300);

  const handleEditComment = () => {
    if (commentId) {
      setCommentId(commentId);
      setIsEditMode(true);
    }
    setTriggerModify(!triggerModify);
  };

  const handleReport = () => {
    toast({
      title: '신고 완료',
      description: '해당 댓글이 신고되었습니다.',
      variant: 'warning',
      duration: 2000,
    });
  };

  return (
    <M.Menubar className="border-none">
      <M.MenubarMenu>
        <M.MenubarTrigger>
          <MoreVertical className={isPost ? 'w-6' : 'w-4'} />
        </M.MenubarTrigger>
        <M.MenubarContent>
          {isMine ? (
            <div>
              <M.MenubarCheckboxItem
                onClick={isPost ? onEditPost : handleEditComment}
                className="bg-white"
              >
                수정
              </M.MenubarCheckboxItem>
              <M.MenubarCheckboxItem
                className="text-warning bg-white"
                onClick={handleCancel}
              >
                삭제
              </M.MenubarCheckboxItem>
            </div>
          ) : (
            <M.MenubarCheckboxItem onClick={handleReport} className="bg-white">
              신고
            </M.MenubarCheckboxItem>
          )}
        </M.MenubarContent>
      </M.MenubarMenu>
      {openDeleteModal && (
        <Modal
          title={isPost ? post.title : comment.title}
          content={isPost ? post.content : comment.content}
          okContent={isPost ? post.okContent : comment.okContent}
          onOkClick={isPost ? handleDeletePost : handleDeleteComment}
          onCancelClick={handleCancel}
        />
      )}
    </M.Menubar>
  );
}

export default Ellipsis;
