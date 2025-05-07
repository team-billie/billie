import AccountList from "@/components/pays/common/AccountList";
import Header from "@/components/pays/common/Header";

export default function MyAccountPage() {
    return (
        <div className="min-h-screen">
            <Header txt="내 계좌" />
            <div className="p-4">
                <AccountList addBtn={true} />
            </div>
        </div>
    )
}