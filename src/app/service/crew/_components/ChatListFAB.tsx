import { COLOR } from '@/styles/color';
import { MessageSquareText } from 'lucide-react';
import Link from 'next/link';

function ChatListFAB() {
  const { white, primary } = COLOR;
  return (
    <Link
      href="crew/my-chat"
      className="fixed bottom-16 right-4 size-[54px] bg-primary rounded-full flex justify-center items-center"
    >
      <MessageSquareText stroke={white} strokeWidth={1} fill={primary} />
    </Link>
  );
}

export default ChatListFAB;
