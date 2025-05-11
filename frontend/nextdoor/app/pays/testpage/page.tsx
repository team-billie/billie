import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";

export default function TestPage() {
    return (
        <div>
            <HandleDepositModal charge={10000} />
        </div>
    )
}