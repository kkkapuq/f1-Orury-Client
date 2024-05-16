import { PostCategoryType } from '@/types/community/post';

function Category({ ...props }: PostCategoryType) {
  const { category: idx, isHot } = props;
  const CATEGORY_TABLE: { [key: number]: string } = {
    1: '자유게시판',
    2: 'QnA',
  };

  return (
    <div className="flex gap-1">
      {isHot && (
        <div className="h-4 bg-purple-200 px-1 py-[2px] rounded-[4px] flex justify-center items-center text-xs font-semibold text-primary tracking-tight">
          인기
        </div>
      )}
      <div className="h-4 bg-primary px-1 py-[2px] rounded-[4px] flex justify-center items-center text-xs font-semibold text-white tracking-tight">
        {CATEGORY_TABLE[idx]}
      </div>
    </div>
  );
}

export default Category;
