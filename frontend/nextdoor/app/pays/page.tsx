import PayBox from "@/components/(tabs)/profile/PayBox";
import LinkHeader from "@/components/(tabs)/profile/LinkHeader";
import HistoryItem from "@/components/pays/(home)/HistoryItem";
import Header from "@/components/pays/common/Header";

export default function PayPage() {
  return (
    <div className=" min-h-screen">
      <Header txt="billy pay" />
      <div className="flex flex-col gap-3 p-4">
        <PayBox type="pay" />
        <div className="flex-1 flex flex-col shadow-popup bg-white bg-opacity-80 p-4 rounded-2xl gap-3">
          <LinkHeader type="history" />
          <div className="flex flex-col gap-3 border-t pt-3">
            <HistoryItem img="none" name="곤약젤리 스트로우" date="25.05.08" type="transferPlus" amount="100" />
            <HistoryItem img="none" name="곤약젤리 스트로우" date="25.05.08" type="transferPlus" amount="100" />
            <HistoryItem img="none" name="곤약젤리 스트로우" date="25.05.08" type="transferPlus" amount="100" />
          </div>
        </div>
      </div>
    </div>
  );
}