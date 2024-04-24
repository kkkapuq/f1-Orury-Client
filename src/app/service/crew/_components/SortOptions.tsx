import SORT_BY from '@/constants/crew/sortBy';
import { useSortByState } from '@/store/crew/sortsStore';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

function SortOptions() {
  const { selectedOption, setSelectedOption } = useSortByState();

  const liClassName = (id: number) => {
    return clsx('flex flex-1 ', {
      'text-violet-500 font-semibold': selectedOption.id === id,
      '': selectedOption.id !== id,
    });
  };

  const buttonClassName = (id: number) => {
    return clsx('w-full h-[45px] flex items-center bg-white border-b', {
      'text-disabled': selectedOption.id !== id,
    });
  };

  const clickHandler = (option: (typeof SORT_BY)[keyof typeof SORT_BY]) => {
    setSelectedOption(option);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild className="flex">
        <button
          type="button"
          className="m-[16px] ml-auto items-center text-xs p-[8px] h-[30px] bg-white rounded-[10px] border border-gray-200 focus:outline-none"
        >
          {selectedOption?.title}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] px-[22px] py-[14px] max-h-[85vh] w-[90vw] max-w-[284px] translate-x-[-50%] translate-y-[-50%] rounded-[10px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-lg font-semibold my-[10px]">
            정렬 기준
          </Dialog.Title>
          <ul>
            {Object.values(SORT_BY).slice(0, 4).map(option => (
              <li key={option.id} className={liClassName(option.id)}>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    onClick={() => clickHandler(option)}
                    className={buttonClassName(option.id)}
                    aria-label="Select sort option"
                  >
                    {option.title}
                  </button>
                </Dialog.Close>
              </li>
            ))}
          </ul>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:outline-none"
              >
                취소
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SortOptions;
