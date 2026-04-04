const NewsLoading = () => (
  <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
    <section className="space-y-8 md:space-y-10">
      <div className="h-9 w-40 animate-pulse rounded bg-black/8 md:h-12 md:w-56" />

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-4xl border border-black/8 bg-white shadow-[0_18px_38px_rgba(0,0,0,0.04)]"
          >
            <div className="aspect-16/10 animate-pulse bg-black/6" />
            <div className="space-y-4 p-5 md:p-7">
              <div className="h-4 w-32 animate-pulse rounded bg-black/6" />
              <div className="space-y-3">
                <div className="h-7 w-4/5 animate-pulse rounded bg-black/7" />
                <div className="h-7 w-3/5 animate-pulse rounded bg-black/7" />
                <div className="h-4 w-full animate-pulse rounded bg-black/6" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-black/6" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-black/6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default NewsLoading;
