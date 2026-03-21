import { SCIENCE_PAGE_TITLE, SCIENCE_SECTIONS } from "../../constants";
import { Sections } from "../sections";

export const Science = () => (
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

      <Sections sections={SCIENCE_SECTIONS} />
    </section>
  </main>
);
