export default function PhotoManager({ status }: { status: string }) {
  return (
    <div className="flex-1 w-full p-3">
      <div className="flex text-xl text-gray900">{status}</div>
      <div className="text-sm text-gray600 pb-1">1장 등록됨</div>
      <div className="bg-slate-600 h-52 w-52 rounded-md"></div>
    </div>
  );
}
