import Header from '@/app/_components/common/Header';
import HEADER from '@/constants/ui/common/header';
import ChatList from '../_components/ChatList';

function page() {
  return (
    <div className="relative bg-[#F9F9F9] min-h-dvh pb-16">
      <Header title={HEADER.chat} />
      <ChatList />
    </div>
  );
}

export default page;
