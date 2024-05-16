import CustomError from '@/error/CustomError';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { END_POINT } from '@/constants/api/end-point';

const postCommentLike = async ({ comment_id }: { comment_id: number }) => {
  try {
    const response = await axiosInstance.post(
      END_POINT.commentController.likeComment(comment_id),
    );

    return response.status;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw new Error(error.message);
    }
  }
};

export default postCommentLike;
