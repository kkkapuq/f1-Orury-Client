'use client';

import clsx from 'clsx';
import { Tab, TabsProps } from '@/types/common/tabs';

function Tabs({ tabs, useStateHook }: TabsProps) {
  const { categoryId, setCategoryId } = useStateHook();

  const liClassName = (id: number) => {
    return clsx('flex flex-1 border-b-4', {
      'border-b-purple-600': categoryId === id,
      'border-b-white': categoryId !== id,
    });
  };

  const buttonClassName = (id: number) => {
    return clsx('w-full h-full flex justify-center items-center bg-white', {
      'text-disabled': categoryId !== id,
    });
  };

  const clickHandler = (id: number) => {
    setCategoryId(id);
  };

  return (
    <ul className="flex h-12">
      {Object.values(tabs).map((tab: Tab) => (
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
