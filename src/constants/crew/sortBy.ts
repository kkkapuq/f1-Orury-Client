const SORT_BY = {
  recommend: {
    title: '추천순',
    id: 1,
  },
  popular: {
    title: '인기순',
    id: 2,
  },
  active: {
    title: '활동순',
    id: 3,
  },
  recent: {
    title: '최신순',
    id: 4,
  },
  mylist: {
    title: '참여 중',
    id: 5,
  },
  waitlist: {
    title: '참여 대기중',
    id: 6,
  },
} as const;

export default SORT_BY;
