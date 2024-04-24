import { AreaGridType, LatLonType } from '@/types/map/map';

// 공통으로 사용되는 URLSearchParams를 생성하는 함수
const commonGymURL = (
  position: LatLonType,
  areaGrid?: AreaGridType,
): URLSearchParams => {
  const url = new URLSearchParams();
  url.append('latitude', String(position.lat));
  url.append('longitude', String(position.lng));

  // areaGrid가 전달되었을 경우에만 각 속성 추가
  if (areaGrid) {
    Object.entries(areaGrid).forEach(([key, value]) => {
      url.append(`${key}`, String(value));
    });
  }

  return url;
};

export const END_POINT = {
  auth: {
    // DEFAULT
    main: '/auth',

    // POST
    refresh: '/auth/refresh',

    // KAKAO
    oauth: '/auth/login',

    signUp: '/auth/sign-up',
  },
  postController: {
    // DEFAULT
    main: '/posts',

    // POST: 게시글 좋아요
    likePost: (postId: number) => `/posts/like/${postId}`,

    // GET: 게시글 상세 조회
    getPostDetail: (postId: number) => `/posts/${postId}`,

    // GET: 인기 게시물 목록 조회
    getHotPostList: (page?: number) => {
      const url = new URLSearchParams();

      url.append('page', String(page));

      return `${END_POINT.postController.main}/hot?${url}`;
    },

    // GET: 게시글 카테고리별 목록 조회
    getPostList: (category: number, cursor?: number) => {
      const url = new URLSearchParams();

      url.append('cursor', String(cursor));

      return `${END_POINT.postController.main}/category/${category}?${url}`;
    },

    // GET: 게시물 검색 결과 조회
    getSearchList: (searchWord: string, cursor: number) => {
      const url = new URLSearchParams();

      url.append('searchWord', String(searchWord));
      url.append('cursor', String(cursor));

      return `${END_POINT.postController.main}?${url}`;
    },

    // DELETE: 게시글 삭제
    deletePost: (postId: number) => `/posts/${postId}`,
  },

  commentController: {
    // DEFAULT
    main: '/comments',

    // POST: 댓글 좋아요
    likeComment: (commentId: number) => `/comments/like/${commentId}`,

    // GET: 댓글 목록 조회
    getComment: (postId: number, cursor?: number) => {
      const url = new URLSearchParams();

      url.append('cursor', String(cursor));

      return `${END_POINT.commentController.main}/${postId}?${url}`;
    },

    // DELETE: 댓글 삭제
    deleteComment: (commentId: number) => `/comments/${commentId}`,
  },
  userController: {
    // DEFAULT
    main: '/user',

    // PATCH
    profileImage: 'user/profile-image',

    // GET
    getMyPosts: (cursor?: number) => {
      const url = new URLSearchParams();

      url.append('cursor', String(cursor));

      return `${END_POINT.userController.main}/posts?${url}`;
    },

    getMyComments: (cursor?: number) => {
      const url = new URLSearchParams();

      url.append('cursor', String(cursor));

      return `${END_POINT.userController.main}/comments?${url}`;
    },

    getMyReviews: (cursor?: number) => {
      const url = new URLSearchParams();

      url.append('cursor', String(cursor));

      return `${END_POINT.userController.main}/reviews?${url}`;
    },
  },
  map: {
    // DEFAULT
    main: '/map',
    // GET
    search: (keyword: string) => `/keyword?keyword=${keyword}`,
    detail: (detailId: string) => `/map/detail?detailId=${detailId}`,
  },
  gymLikeController: {
    // DEFAULT
    default: (gymId: number) => `/gyms/like/${gymId}`,
  },
  reviewsController: {
    // DEFAULT
    default: '/reviews',
    reaction: (review_id: number) =>
      `${END_POINT.reviewsController.default}/${review_id}/reaction`,
    // GET
    getReviews: (reviewId: number, cursor: number) => {
      const url = new URLSearchParams();
      url.append('cursor', String(cursor));
      return `${END_POINT.reviewsController.default}/gym/${reviewId}?${url.toString()}`;
    },
    getDetailReview: (reviewId: number) => {
      return `${END_POINT.reviewsController.default}/${reviewId}`;
    },
    // DELETE
    deleteReview: (deleteReviewId: number) => {
      return `${END_POINT.reviewsController.default}/${deleteReviewId}`;
    },
    // PATCH
    patchReview: (deleteReviewId: number) => {
      return `${END_POINT.reviewsController.default}/${deleteReviewId}`;
    },
  },
  gymController: {
    // DEFAULT
    default: '/gyms',
    // GET
    searchList: (position: LatLonType, keyword: string) => {
      const url = commonGymURL(position);
      url.append('search_word', keyword);
      return `${END_POINT.gymController.default}/search?${url.toString()}`;
    },
    // 주변 암장 GET
    aroundGymList: (position: LatLonType, areaGrid: AreaGridType) => {
      const url = commonGymURL(position, areaGrid);
      return `${END_POINT.gymController.default}?${url.toString()}`;
    },
    detail: (detailId: string) =>
      `${END_POINT.gymController.default}/${detailId}`,
  },
  crewController: {
    main: '/crews',

    // GET : 크루 상세 조회
    getCrewDetail: (crewId: number) => `/crews/${crewId}`,

    // GET: 크루 추천순 조회
    getListByRecommend: (page: number) => `/crews/recommend?page=${page}`,

    // GET: 크루 랭킹순 조회
    getListByRank: (page: number) => `/crews/rank?page=${page}`,

    // GET: 내 크루 조회
    getMyCrews: (page: number) => `/crews/mycrew?page=${page}`,

    // GET: 크루 멤버 조회 
    getCrewMembers : (crewId: number) => `/crews/${crewId}/members`,
  },
  notificationController: {
    // DEFAULT
    default: '/notification',

    getNotification: (page: number) => {
      const url = new URLSearchParams();

      url.append('page', String(page));

      return `${END_POINT.notificationController.default}?${url.toString()}`;
    },
  },
};
