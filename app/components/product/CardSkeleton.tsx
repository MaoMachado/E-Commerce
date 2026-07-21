export default function CardSkeleton() {
  return (
    <div className="border-2 border-sky-700/50 rounded-lg overflow-hidden w-full lg:w-70 bg-blue-800/50 relative animate-pulse">
      {/* Category */}
      <span className="absolute top-2 right-2 h-7 w-20 rounded-full bg-slate-600" />

      {/* Image */}
      <div className="h-64 bg-slate-700 rounded-lg" />

      {/* Name */}
      <div className="px-4 py-3">
        <div className="h-7 w-3/4 mx-auto rounded bg-slate-600" />
      </div>

      {/* Precio y Stock */}
      <div className="flex justify-between px-3 py-2">
        <div className="h-5 w-24 rounded bg-slate-600" />
        <div className="h-5 w-20 rounded bg-slate-600" />
      </div>

      {/* Botón */}
      <div className="px-3 pb-3">
        <div className="h-10 w-full rounded-md bg-slate-600" />
      </div>
    </div>
  );
}
