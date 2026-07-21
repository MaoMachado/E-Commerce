export default function CartCardSkeleton() {
  return (
    <section className="border-2 border-sky-700/50 rounded-lg overflow-hidden w-full lg:w-70 bg-blue-800/50 relative">
      {/* Image Skeleton */}
      <div className="h-64 bg-slate-700 rounded-lg animate-pulse" />

      {/* Name */}
      <div className="w-30 h-6 bg-slate-600 rounded-full absolute top-1 right-1 animate-pulse" />

      {/* Quantity and Price */}
      <div className="p-3 flex justify-between">
        <div className="h-5 w-24 rounded bg-slate-600 animate-pulse" />
        <div className="h-5 w-20 rounded bg-slate-600 animate-pulse" />
      </div>

      {/* Buttons Skeleton */}
      <div className="flex justify-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-md bg-slate-600 animate-pulse" />
        <div className="h-8 w-8 rounded-md bg-slate-600 animate-pulse" />
      </div>

      {/* Subtotal Skeleton */}
      <div className="border-t-2 border-gray-500/80 py-3 font-semibold tracking-wider text-center">
        <div className="h-5 w-24 rounded bg-slate-600 animate-pulse mx-auto" />
      </div>
    </section>
  );
}
