import EnterAccount from "@/components/pays/common/EnterAccount";
import Header from "@/components/pays/common/Header";

export default function AddAccountPage() {
    return (
        <div className="min-h-screen">
            <Header txt="계좌 등록" />
            <div className="p-4">
                <EnterAccount btnTxt="계좌 등록하기" />
                <div className="mt-4 text-sm text-gray700 text-center">계좌 등록이 처음이신가요?</div>
            </div>
        </div>
    )
}