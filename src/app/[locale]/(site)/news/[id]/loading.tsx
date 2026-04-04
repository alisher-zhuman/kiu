const NewsDetailLoading = () => (
  <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
    <article className="space-y-8 md:space-y-10">
      <div className="space-y-4 md:space-y-5">
        <div className="h-4 w-40 animate-pulse rounded bg-black/6" />
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <div className="h-10 w-4/5 animate-pulse rounded bg-black/8 md:h-14" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="aspect-4/3 animate-pulse rounded-3xl bg-black/6"
          />
        ))}
      </div>

      <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:p-7">
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-4 animate-pulse rounded bg-black/6"
            />
          ))}
        </div>
      </div>
    </article>
  </main>
);

export default NewsDetailLoading;
