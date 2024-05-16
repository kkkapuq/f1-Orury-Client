import { EOL } from 'os';

export const MODAL = {
  withdrawal: {
    title: '회원 탈퇴',
    content: `회원 탈퇴를 진행하시겠습니까? ${EOL}한번 삭제된 정보는 복구할 수 없습니다.`,
    okContent: '탈퇴',
  },
  deleteCommunity: {
    comment: {
      title: '댓글 삭제',
      content: `댓글을 삭제하시겠습니까? ${EOL}삭제된 내용은 복구할 수 없습니다.`,
      okContent: '삭제',
    },

    post: {
      title: '게시글 삭제',
      content: `게시글을 삭제하시겠습니까? ${EOL}삭제된 내용은 복구할 수 없습니다.`,
      okContent: '삭제',
    },
  },
  withdrawCrew: {
    title: '가입 신청 철회',
    content: `크루 가입 신청을 철회하시겠습니까? ${EOL}작성했던 답변 내용은 복구할 수 없습니다.`,
    okContent: '철회',
  },
  deleteCrew: {
    title: '크루 삭제',
    content: `크루를 삭제하시겠습니까? ${EOL}크루 멤버 등 삭제된 정보는 복구할 수 없습니다.`,
    okContent: '삭제',
  },
  reportCrew: {
    title: '크루 신고',
    content: `크루를 신고하시겠습니까? `,
    okContent: '신고',
  },
} as const;
