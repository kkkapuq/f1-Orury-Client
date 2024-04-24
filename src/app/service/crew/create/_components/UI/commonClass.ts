import clsx from 'clsx';

export const labelClass = clsx('block mb-[10px] font-medium text-[16px]');
export const inputClass = clsx(
  'w-full rounded-[10px] p-[14px] text-[14px] mb-[40px] border border-[#d9d9d9] focus:outline-none',
);
export const commonSelectStyles =
  'text-left w-full bg-white rounded-[10px] font-medium border border-zinc-300 p-[16px]';
export const activeSelectStyles =
  'text-[#855AFF] bg-[#F3EFFF] border-[#855AFF]';
export const submitButtonClass = clsx(
  'rounded px-2 py-[12px] text-[16px] font-semibold ',
  'disabled:cursor-not-allowed disabled:bg-[#96A2AC]',
);
