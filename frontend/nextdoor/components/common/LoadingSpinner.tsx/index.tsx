// components/common/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full border-4 border-blue400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-full h-full border-4 border-blue300 border-t-transparent rounded-full animate-spin-slower"></div>
      </div>
    </div>
  );
}
