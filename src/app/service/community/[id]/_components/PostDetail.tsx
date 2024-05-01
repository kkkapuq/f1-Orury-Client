import { PostDetailProps } from '@/types/community/post';
import * as C from '@/app/_components/ui/carousel';
import User from '@/app/service/community/_components/User';
import Image from 'next/image';
import { v4 } from 'uuid';
import { useImagesStore } from '@/store/modal/imageModalStore';
import { Eye, ThumbsUp } from 'lucide-react';
import usePostListApi from '@/hooks/community/usePostList';
import { useState } from 'react';
import deletePostLike from '@/app/service/community/[id]/api/deletePostLike';
import postPostLike from '@/app/service/community/[id]/api/postPostLike';

function PostDetail({ ...props }: PostDetailProps) {
  const {
    user_profile_image,
    user_nickname,
    created_at,
    is_like,
    title,
    content,
    like_count,
    view_count,
    id,
    images,
    user_id,
    category,
  } = props;
  const { mutate } = usePostListApi.useGetPostList(category);
  const handleCarouselOpen = useImagesStore(state => state.setModalOpen);
  const [isLiked, setIsLiked] = useState(is_like);
  const [likes, setLikes] = useState(like_count);

  const onCarouselOpen = () => {
    if (images) handleCarouselOpen(images);
  };

  const handleClick = async (isLiked: boolean) => {
    setIsLiked(!isLiked);
    setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1));

    if (isLiked) await deletePostLike({ post_id: id });
    else await postPostLike({ post_id: id });

    await mutate();
  };

  return (
    <div className="flex flex-col gap-4  m-4 p-4 bg-white rounded-lg">
      <User
        userProfileImage={user_profile_image}
        userNickname={user_nickname}
        createdAt={created_at}
        isLike={is_like}
        postId={id}
        userId={user_id}
      />
      <div className="flex flex-col gap-4">
        <span className="font-semibold">{title}</span>
        <span className="text-sm font-normal whitespace-pre-wrap">
          {content}
        </span>
      </div>

      {images && images.length ? (
        <C.Carousel
          opts={{
            align: 'start',
          }}
          className="mr-[-1rem]"
        >
          <C.CarouselContent className="sm:h-64 sm:w-64 h-32 w-32">
            {images.map((image, index) => (
              <C.CarouselItem key={v4()} className="relative ml-4">
                <Image
                  src={image}
                  alt={`selected-image-${index}`}
                  className="rounded-lg"
                  onClick={onCarouselOpen}
                  fill
                />
              </C.CarouselItem>
            ))}
          </C.CarouselContent>
        </C.Carousel>
      ) : null}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => handleClick(isLiked)}
          className="relative flex px-3 py-2 gap-1 rounded-2xl items-center border border-grey-200"
        >
          <ThumbsUp
            size={20}
            color="#000"
            className="bg-purple-300 px-1 rounded-xl"
          />
          <span className="text-[11px] font-medium leading-tight">{likes}</span>
        </button>
        <div className="flex items-center gap-1">
          <Eye size={16} strokeWidth={2} color="#555" />
          <span className="text-[10px] font-medium leading-tight">{`${view_count}명이 봤어요`}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
