export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue400 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
