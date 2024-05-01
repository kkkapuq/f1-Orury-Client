'use client';

import clsx from 'clsx';
import TABS from '@/constants/community/tabs';
import { usePostsState } from '@/store/community/postsStore';

function Tabs() {
  const { categoryId, setCategoryId } = usePostsState();

  const liClassName = (id: number) => {
    return clsx('flex rounded-xl transition duration-500 ease-in-out', {
      'bg-white m-1': categoryId === id,
      'bg-none': categoryId !== id,
    });
  };

  const buttonClassName = (id: number) => {
    return clsx('w-full h-full flex justify-center items-center font-bold', {
      'text-disabled': categoryId !== id,
      'text-primary': categoryId === id,
    });
  };

  const clickHandler = (id: number) => setCategoryId(id);

  return (
    <ul className="grid grid-cols-3 h-10 mx-4 bg-grey-100 rounded-xl">
      {Object.values(TABS).map(tab => (
        <li key={tab.title} className={liClassName(tab.id)}>
          <button
            type="button"
            onClick={() => clickHandler(tab.id)}
            className={buttonClassName(tab.id)}
          >
            {tab.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
