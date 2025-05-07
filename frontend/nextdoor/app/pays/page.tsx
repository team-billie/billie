import SelectBankModal from "@/components/pays/modals/SelectBankModal";
import PaymentModal from "@/components/pays/modals/PaymentModal";

export default function PayPage() {
    return <div>
      <PaymentModal charge={1000}/>
    </div>;
  }