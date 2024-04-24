import { END_POINT } from '@/constants/api/end-point';
import TABS_COMMUNITY from '@/constants/community/tabs';
import { UseSortByStateProps } from '@/store/crew/sortsStore';
import { TResponse } from '@/types/common/response';
import { CommentListData } from '@/types/community/comment';
import { PostListData } from '@/types/community/post';
import { CrewListData } from '@/types/crew/crewList';
import { NotificationData } from '@/types/notification';
import { AxiosResponse } from 'axios';

export const getUserPostListKey = (
  pageIndex: number,
  type: 'post' | 'comment',
  previousPageData?: AxiosResponse<TResponse<PostListData>>,
) => {
  if (previousPageData && previousPageData.data.data.cursor === -1) return null;

  if (type === 'post') {
    if (!previousPageData && pageIndex === 0) {
      return END_POINT.userController.getMyPosts(0);
    }

    return END_POINT.userController.getMyPosts(
      previousPageData?.data.data.cursor,
    );
  }

  if (type === 'comment') {
    if (!previousPageData && pageIndex === 0) {
      return END_POINT.userController.getMyComments(0);
    }
  }

  return END_POINT.userController.getMyComments(
    previousPageData?.data.data.cursor,
  );
};

export const getSearchPostListKey = (
  searchText: string,
  pageIndex: number,
  previousPageData: AxiosResponse<TResponse<PostListData>>,
) => {
  if (previousPageData && previousPageData.data.data.cursor === -1) return null;

  if (!previousPageData && pageIndex === 0) {
    return END_POINT.postController.getSearchList(searchText, 0);
  }

  return END_POINT.postController.getSearchList(
    searchText,
    previousPageData.data.data.cursor,
  );
};

export const getCommentKey = (
  postId: number,
  pageIndex: number,
  previousPageData?: AxiosResponse<TResponse<CommentListData>>,
  cursor?: number,
): string => {
  if (previousPageData && previousPageData.data.data.cursor === -1) return '';
  if (!previousPageData && pageIndex === 0) {
    return END_POINT.commentController.getComment(postId, 0);
  }

  const currentCursor = cursor || previousPageData?.data.data.cursor;

  return END_POINT.commentController.getComment(postId, currentCursor);
};

export const getPostListKey = (
  categoryId: number,
  pageIndex: number,
  previousPageData?: AxiosResponse<TResponse<PostListData>>,
) => {
  if (previousPageData && previousPageData.data.data.cursor === -1) return null;

  if (
    previousPageData &&
    categoryId === TABS_COMMUNITY.hot.id &&
    previousPageData.data.data.next_page === -1
  ) {
    return null;
  }

  if (!previousPageData && categoryId === TABS_COMMUNITY.hot.id) {
    return END_POINT.postController.getHotPostList(0);
  }

  if (!previousPageData && pageIndex === 0) {
    return END_POINT.postController.getPostList(categoryId, 0);
  }

  if (categoryId === 3) {
    return END_POINT.postController.getHotPostList(
      previousPageData?.data.data.next_page,
    );
  }
  return END_POINT.postController.getPostList(
    categoryId,
    previousPageData?.data.data.cursor as number,
  );
};

export const getCrewListKey = (
  categoryId: number,
  pageIndex: number,
  previousPageData?: AxiosResponse<TResponse<CrewListData>>,
  selectedOption?: UseSortByStateProps['selectedOption'],
) => {
  let endpoint: (pageNumber: number) => string =
    END_POINT.crewController.getListByRecommend;

  const currentPage = previousPageData?.data.data.number;

  if (
    previousPageData &&
    !previousPageData.data.data.first &&
    previousPageData.data.data.last
  ) {
    return null;
  }

  switch (categoryId) {
    case 1:
      if (!previousPageData && selectedOption) {
        switch (selectedOption.title) {
          case '추천순':
            endpoint = END_POINT.crewController.getListByRecommend;
            break;
          case '인기순':
            endpoint = END_POINT.crewController.getListByRank;
            break;
          default:
            endpoint = END_POINT.crewController.getListByRecommend;
            break;
        }
      }

      break;

    case 2:
      if (selectedOption) {
        switch (selectedOption.title) {
          case '참여 중':
            endpoint = END_POINT.crewController.getMyCrews;
            break;
          case '참여 대기중':
            //api 나오면 변경 
            endpoint = END_POINT.crewController.getMyCrews
        }
      }

      if (!previousPageData && pageIndex === 0) {
        return endpoint(0);
      }
      break;

    default:
      return END_POINT.crewController.getMyCrews(pageIndex);
      break;
  }

  if (endpoint) {
    if (!previousPageData && pageIndex === 0) {
      return endpoint(0);
    }

    return endpoint((currentPage as number) + 1);
  }
};

export const getNotificationListKey = (
  pageIndex: number,
  previousPageData?: AxiosResponse<TResponse<NotificationData>>,
) => {
  const currentPage = previousPageData?.data.data.number;

  // 첫 페이지가 아닌 마지막 페이지인 경우 null을 반환한다.
  if (
    previousPageData &&
    !previousPageData.data.data.first &&
    previousPageData.data.data.last
  ) {
    return null;
  }

  // 첫 페이지인 경우
  if (!previousPageData && pageIndex === 0) {
    return END_POINT.notificationController.getNotification(0);
  }

  return END_POINT.notificationController.getNotification(
    (currentPage as number) + 1,
  );
};
