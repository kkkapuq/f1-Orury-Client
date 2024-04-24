import SORT_BY from '@/constants/crew/sortBy';
import { cn } from '@/lib/utils';
import { useSortByState } from '@/store/crew/sortsStore';
import { defaultOptionStyles, selectedOptionStyles } from './UI/commonClass';
import { useEffect } from 'react';

function SortStatus() {
  const { selectedOption, setSelectedOption } = useSortByState();

  const clickHandler = (option: (typeof SORT_BY)[keyof typeof SORT_BY]) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption(SORT_BY.mylist);
  }, []);
  
  return (
    <div className="mt-[16px]">
      {Object.values(SORT_BY)
        .slice(4, 6)
        .map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => clickHandler(option)}
            className={cn(
              defaultOptionStyles,
              selectedOption === option ? selectedOptionStyles : null,
            )}
          >
            {option.title}
          </button>
        ))}
    </div>
  );
}

export default SortStatus;
