//계좌 등록하기 페이지
import EnterAccount from "@/components/pays/common/EnterAccount";
import Header from "@/components/pays/common/Header";

export default function AddAccountPage() {
    return (
        <div className="relative flex flex-col h-screen">
            <Header txt="계좌 등록" />
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                <EnterAccount btnTxt="계좌 등록하기" />
                <div className="mt-4 text-sm text-gray700 text-center">계좌 등록이 처음이신가요?</div>
            </div>
        </div>
    )
}