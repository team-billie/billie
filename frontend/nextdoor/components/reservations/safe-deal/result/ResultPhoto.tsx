export default function ResultPhoto({ status }: { status: string }) {
  return (
    <div className="flex-1 w-full">
      <div className="flex text-sm text-gray700 justify-center pb-1">
        {status}
      </div>
      <div className="bg-slate-600 h-28 w-full rounded-md"></div>
    </div>
  );
}
