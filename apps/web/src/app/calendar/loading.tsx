export default function CalendarLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-9 bg-zinc-800 rounded-lg w-52 animate-pulse mb-2" />
        <div className="h-4 bg-zinc-800 rounded w-64 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 21 }).map((_, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800" />
              <div className="flex-1">
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-1.5" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
              </div>
              <div className="h-5 w-12 bg-zinc-800 rounded" />
            </div>
            <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
            <div className="h-3 bg-zinc-800 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
