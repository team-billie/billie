import { Damage } from "@/types/ai-analysis/response";

interface ResultItemProps {
  damage: Damage;
}

export default function ResultItem({ damage }: ResultItemProps) {
  return (
    <div className="w-full flex">
      <div className="bg-gray700 w-1"></div>
      <div className="text-lg px-4 py-3 w-full bg-transparentWhite10 text-white break-words">
        <div className="font-semibold mb-1">{damage.location}</div>
        <div>{damage.details}</div>
      </div>
    </div>
  );
}
