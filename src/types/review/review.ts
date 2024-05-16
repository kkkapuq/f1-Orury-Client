export interface ReactionType {
  type: 'wantToGo' | 'helped' | 'great' | 'funny';
  count: number;
}

export interface ReviewDataType {
  id: number;
  is_mine: boolean;
  my_reaction: 'wantToGo' | 'helped' | 'great' | 'funny' | null;
  review_reaction_count: ReactionType[];
  content: string;
  images: string[];
  score: number;
  created_at: string;
  updated_at: string;
  writer: {
    id: number;
    nickname: string;
    profile_image: string;
  };
}

export interface ReviewResponseType {
  reviews: ReviewDataType[];
  gym_name: string;
  cursor: number;
}

export interface MyReviewResponseType {
  list: ReviewDataType[];
  cursor: number;
}

export interface ReviewStateType {
  prevImages: File[] | null;
  prevScore: number | null;
  prevContent: string | null;
  prevId: number | null;
}

export interface ReviewRegisterType {
  newContent: string;
  newScore: number;
  fixId: number;
}

export interface SubmitReviewType {
  score: number;
  content: string;
  gym_id?: number;
}
