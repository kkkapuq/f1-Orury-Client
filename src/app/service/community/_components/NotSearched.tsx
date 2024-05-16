import searching from '$/images/searching.png';

import { giants } from '@/styles/fonts';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/_components/ui/accordion';

function NotSearched({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-32 sm:gap-0 items-center z-[102] mt-4">
      <div className="ml-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>최신순</AccordionTrigger>
            <AccordionContent>인기순</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col items-center h-[calc(100vh-208px)] sm:justify-center">
        <Image src={searching} alt="검색" width={100} height={100} />
        <span
          className={`text-lg sm:text-xl text-grey-600 pt-4 ${giants.className}`}
        >
          {content}
        </span>
      </div>
    </div>
  );
}

export default NotSearched;
