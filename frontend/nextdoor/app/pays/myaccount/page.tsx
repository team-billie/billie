//내 계좌 페이지
import AccountList from "@/components/pays/common/AccountList";
import Header from "@/components/pays/common/Header";

export default function MyAccountPage() {
    return (
        <div className="relative flex flex-col max-h-[100dvh]">
            <Header txt="내 계좌" />
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                <AccountList addBtn={true} />
            </div>
        </div>
    )
}