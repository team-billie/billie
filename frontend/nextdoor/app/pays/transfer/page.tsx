//송금하기 페이지
import Header from "@/components/pays/common/Header";
import EnterAccount from "@/components/pays/common/EnterAccount";
import AccountList from "@/components/pays/common/AccountList";

export default function TransferPage() {
    return (
      <div className="relative flex flex-col max-h-screen">
        <Header txt="계좌송금"/>
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
          <EnterAccount btnTxt="다음"/>
          <div className="text-lg font-bold">내 계좌</div>
          <div className="overflow-y-auto flex flex-col gap-3">
            <AccountList/>
          </div>
        </div>
      </div>
  );
  }