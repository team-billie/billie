import Header from "@/components/pays/common/Header";
import EnterAccount from "@/components/pays/common/EnterAccount";
export default function TransferPage() {
    return (
      <div className="relative flex flex-col min-h-screen">
        <Header txt="계좌송금"/>
        <div className="flex-1 flex flex-col gap-3 p-4">
          <EnterAccount btnTxt="다음"/>
          <div className="text-lg font-bold">내 계좌</div>
        </div>
      </div>
  );
  }