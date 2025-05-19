interface Damage {
  location: string;
  details: string;
  confidenceScore: number;
}

interface ResultItemProps {
  damage: Damage;
}
export default function ResultItem({ damage }: ResultItemProps) {
  return (
    <div className="w-full flex">
      <div className="bg-gray700 w-1 "></div>
      <div className="text-lg px-4 py-3 w-full bg-transparentWhite10 text-white break-words">
        {damage.details}
      </div>
    </div>
  );
}
