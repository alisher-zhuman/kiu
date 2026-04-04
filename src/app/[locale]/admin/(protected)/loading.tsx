const AdminLoading = () => (
  <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
    <section className="space-y-8">
      <div className="h-10 w-40 animate-pulse rounded bg-black/8" />

      <div className="grid gap-5 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_14px_32px_rgba(0,0,0,0.04)]"
          >
            <div className="aspect-4/3 animate-pulse bg-black/6" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-28 animate-pulse rounded bg-black/6" />
              <div className="h-7 w-3/4 animate-pulse rounded bg-black/8" />
              <div className="h-4 w-full animate-pulse rounded bg-black/6" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-black/6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default AdminLoading;
