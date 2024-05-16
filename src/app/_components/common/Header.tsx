'use client';

import clsx from 'clsx';
import HeaderProps from '@/types/ui/common/header';
import deletePost from '@/app/service/community/[id]/api/deletePost';
import usePostListApi from '@/hooks/community/usePostList';
import Ellipsis from '@/app/_components/common/Ellipsis';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronLeft,
  MoreVertical,
  X,
  Search,
  Upload,
  Plus,
} from 'lucide-react';
import { usePostsState } from '@/store/community/postsStore';
import { useDebouncedCallback } from 'use-debounce';
import { useToast } from '@/app/_components/ui/use-toast';
import { COLOR } from '@/styles/color';

function Header({ ...props }: Partial<HeaderProps>) {
  const {
    title,
    isBack,
    isExit,
    isEllipsis,
    isSearching,
    onEdit,
    onExit,
    onSearch,
    onBack,
    routeTo,
  } = props;
  const { toast } = useToast();
  const { categoryId } = usePostsState();
  const { mutate } = usePostListApi.useGetPostList(categoryId);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const onBackHandler = () => {
    router.back();
  };

  const cancelHandler = () => {
    setOpenDeleteModal(openDeleteModal => !openDeleteModal);
  };

  const okHandler = useDebouncedCallback(async () => {
    const message = await deletePost({ postId: Number(params.id) });
    await mutate();
    setOpenDeleteModal(openDeleteModal => !openDeleteModal);

    router.back();
    toast({ variant: 'success', description: message, duration: 2000 });
  }, 300);

  const buttonClassName = (isBack?: boolean) => {
    return clsx('absolute', {
      'left-4': isBack,
      'right-4': !isBack,
    });
  };

  const ellipsisClassName = (isEllipsis?: boolean) => {
    return clsx('absolute', {
      'right-4 h-6': isEllipsis,
    });
  };

  return (
    <header className="sticky top-0 flex items-center justify-center h-12 bg-white z-10 relative">
      <button
        type="button"
        onClick={onBack || onBackHandler}
        className={buttonClassName(isBack)}
      >
        {isBack && <ChevronLeft />}
      </button>
      <span className="font-medium">{title}</span>
      <div className="absolute right-4">
        {isEllipsis && <Ellipsis isPost onEditPost={onEdit} isMine />}
        {categoryId !== 3 && isSearching && (
          <button type="button" onClick={onSearch}>
            <Search color={COLOR.primary} />
          </button>
        )}
        {categoryId === 3 && (
          <button type="button" onClick={onSearch}>
            <Upload strokeWidth={1} />
          </button>
        )}
      </div>
      {isExit && (
        <button
          type="button"
          className={buttonClassName(isBack)}
          onClick={onBackHandler}
        >
          <X />
        </button>
      )}
      {routeTo && (
        <button
          type="button"
          className={buttonClassName(isBack)}
          onClick={() => router.push(routeTo)}
        >
          <Plus color={COLOR.primary} />
        </button>
      )}
    </header>
  );
}

export default Header;
