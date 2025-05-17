interface Damage {
  location: string;
  details: string;
  confidenceScore: number;
}

interface DetailItemProps {
  damage: Damage;
  sequence: number;
}
export default function DetailItem({ damage, sequence }: DetailItemProps) {
  console.log(sequence, damage);
  return (
    <div className="w-full flex">
      <div className="flex  gap-2  text-lg p-5 w-full bg-transparentWhite10 text-white break-words rounded-2xl">
        <div className="border-gray800 flex items-center justify-center w-8 h-8 p-4 text-sm border rounded-full">
          {sequence}
        </div>

        <div>{damage.details}</div>
      </div>
    </div>
  );
}
