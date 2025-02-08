export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
