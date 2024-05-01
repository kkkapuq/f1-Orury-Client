import useIntersect from '@/hooks/common/useIntersection';
import OnePost from '@/app/service/community/_components/OnePost';
import NotSearched from '@/app/service/community/_components/NotSearched';
import usePostListApi from '@/hooks/community/usePostList';

import { CommunityModalProps } from '@/types/user';

function CommunityModal({ ...props }: CommunityModalProps) {
  const { searchText } = props;
  const { data, size, setSize, isValidating } =
    usePostListApi.useGetSearchPostList(searchText);
  const posts = data ? data.flatMap(page => page.data.data.posts) : [];
  const bottomRef = useIntersect(() => {
    if (!isValidating) setSize(size + 1);
  });

  return (
    <section className="opacity-100 top-0 z-9 bg-white pt-12 px-4 pb-4 absolute w-full h-[calc(100vh-3.5rem)]">
      {searchText ? (
        <>
          <ul>{posts?.map(post => <OnePost key={post.id} {...post} />)}</ul>
          <div ref={bottomRef} />
        </>
      ) : (
        <NotSearched content="글을 검색해보세요" />
      )}
    </section>
  );
}

export default CommunityModal;
