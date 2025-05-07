import ChatsHeader from "@/components/chats/ChatsHeader";
import MainHeader from "@/components/common/Header/ReservationHeader";

export default function ChatPage() {
  return (
    <main>
      <MainHeader title="Messages" />
      <ChatsHeader />
      <div className="h-screen overflow-y-auto p-4 flex flex-col gap-6"></div>
    </main>
  );
}
