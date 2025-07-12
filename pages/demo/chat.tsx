import DefaultLayout from "@/layouts/default";
import ChatBox from "@/components/premium/chat/ChatBox";

export default function DemoChatPage() {
  return (
    <DefaultLayout>
      <div className="max-w-md mx-auto py-12">
        <ChatBox channel="demo" user={{ id: "1", name: "Ada" }} />
      </div>
    </DefaultLayout>
  );
}
