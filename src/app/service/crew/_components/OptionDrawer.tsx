import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/app/_components/ui/drawer';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';

interface OptionDrawerProps {
  handlers: {
    [buttonName: string]: {
      onClick: () => void;
      color?: string;
    };
  };
}

export function OptionDrawer({ ...props }: OptionDrawerProps) {
  const { handlers } = props;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button type="button" className={'absolute right-4'}>
          <MoreVertical />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#F9F9F9]">
        <div className="text-center bg-white mx-[16px] font-medium text-[16px] rounded-[10px]">
          <div className="flex flex-col px-[16px]">
            {Object.entries(handlers).map(
              ([buttonName, { onClick, color }]) => (
                <DrawerClose asChild key={buttonName}>
                  <button
                    onClick={onClick}
                    className={cn(
                      'w-full bg-white py-[12px] text-[16px] rounded-[10px]',
                      `text-[${color}]`,
                    )}
                  >
                    {buttonName}
                  </button>
                </DrawerClose>
              ),
            )}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button className="w-full bg-white py-[12px] text-[16px] rounded-[10px]">
              닫기
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
