import SelectBankModal from "@/components/pays/modals/SelectBankModal";
import PaymentApplyModal from "@/components/pays/modals/PaymentApplyModal";
import HandleDepositModal from "@/components/pays/modals/HandleDepositModal";

export default function PayPage() {
    return <div>
      <HandleDepositModal charge={1000}/>
    </div>;
  }