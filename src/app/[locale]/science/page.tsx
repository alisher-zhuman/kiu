import { SCIENCE_PAGE_TITLE, SCIENCE_SECTIONS } from "./constants";

const SciencePage = () => (
  <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
    <section aria-labelledby="science-page-title">
      <div className="border-l-2 border-black pl-3 md:pl-4">
        <h1
          id="science-page-title"
          className="text-2xl font-bold uppercase sm:text-3xl md:text-5xl"
        >
          {SCIENCE_PAGE_TITLE}
        </h1>
      </div>

      <div className="mt-10 space-y-10 md:mt-16 md:space-y-18">
        {SCIENCE_SECTIONS.map(({ title, description, items, note }) => (
          <section key={title} className="space-y-3 md:space-y-4">
            <h2 className="text-xl font-bold sm:text-2xl md:text-4xl">
              {title}
            </h2>

            {description ? (
              <p className="whitespace-pre-line text-base leading-7 text-black/85 sm:text-lg sm:leading-8 md:text-[1.7rem] md:leading-[1.55]">
                {description}
              </p>
            ) : null}

            {items ? (
              <ul className="list-disc space-y-1 pl-5 text-base leading-7 text-black/85 marker:text-black/70 sm:pl-6 sm:text-lg sm:leading-8 md:text-[1.7rem] md:leading-[1.55]">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {note ? (
              <p className="text-base leading-7 text-black/85 sm:text-lg sm:leading-8 md:text-[1.7rem] md:leading-[1.55]">
                {note}
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </section>
  </main>
);

export default SciencePage;
