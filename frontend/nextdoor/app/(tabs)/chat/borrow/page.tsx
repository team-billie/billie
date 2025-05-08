import ChatsHeader from "@/components/chats/list/ChatsHeader";
import MainHeader from "@/components/common/Header/ReservationHeader";
import ChatsList from "@/components/chats/list/ChatRoomList";

export default function ChatBorrowPage() {
  return (
    <main>
      <MainHeader title="Messages" />
      <ChatsHeader />
      <ChatsList chatRooms={[1,2,3,4,5,6,7,8,9,10]} isLoading={false} userRole="borrower" />
      
      <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6"></div>
    </main>
  );
}
