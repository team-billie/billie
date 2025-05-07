import SelectBankModal from "@/components/pays/modals/SelectBankModal";
import PaymentApplyModal from "@/components/pays/modals/PaymentApplyModal";

export default function PayPage() {
    return <div>
      <PaymentApplyModal charge={1000}/>
    </div>;
  }