import { Damage } from "@/types/ai-analysis/response";

interface DetailItemProps {
  damage: Damage[];
  sequence: number;
}

export default function DetailItem({ damage, sequence }: DetailItemProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {damage.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 text-lg p-3 py-5 w-full bg-transparentWhite10 text-white break-words rounded-2xl"
        >
          <div className="flex ">
            <div className=" flex ">
              <div className="w-9 h-9  rounded-full border-gray700 border text-white flex items-center justify-center text-center">
                <span>{sequence}-</span>
                <span className="tex-sm">{index + 1}</span>
              </div>
            </div>
            <div className="flex flex-col pl-4 gap-2">
              <div className="font-semibold">{item.location}</div>
              <div className="text-gray-300">{item.details}</div>
              <div className="text-sm text-gray-400">
                신뢰도: {Math.round(item.confidenceScore * 100)}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
