import { cn } from '@/lib/utils';

export const defaultOptionStyles = cn(
  'w-fit text-xs rounded-[10px] p-[8px] mr-[8px] items-center',
  'bg-white border border-zinc-300 text-black',
);

export const selectedOptionStyles = cn(
  'bg-[#855AFF] border-[#855AFF] text-white',
);
