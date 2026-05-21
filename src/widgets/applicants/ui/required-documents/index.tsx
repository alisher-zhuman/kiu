import { useTranslations } from "next-intl";

import { checkExternalHref } from "@/shared/helpers";

import { type RequiredDocumentsSection } from "../../types";
import { SupportCard } from "../support-card";

export const RequiredDocuments = () => {
  const t = useTranslations("RequiredDocumentsPage");
  const pageTitle = t("title");
  const sections = t.raw("sections") as ReadonlyArray<RequiredDocumentsSection>;

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <div className="space-y-16 md:space-y-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
        {sections.map(({ title, items, contacts, contactsLabel }, index) => {
          const headingTag = index === 0 ? "h1" : "h2";
          const Heading = headingTag;
          const headingText = index === 0 ? pageTitle : title;

          return (
            <section
              key={headingText ?? index}
              aria-labelledby={`required-documents-${index}`}
            >
              <div className="border-l-2 border-black pl-3 md:pl-4">
                <Heading
                  id={`required-documents-${index}`}
                  className="text-2xl font-bold sm:text-3xl md:text-5xl"
                >
                  {headingText}
                </Heading>
              </div>

              <div className="mt-8 pl-6 md:mt-10 md:pl-12">
                <ul className="list-disc space-y-1 text-base leading-7 text-black/85 marker:text-black/70 md:space-y-2 md:text-[1.7rem] md:leading-normal">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}

                  {contacts?.length && contactsLabel ? (
                    <li>
                      {contactsLabel}:{" "}
                      {contacts.map(({ href, label }, contactIndex) => {
                        const isExternal = checkExternalHref(href);

                        return (
                          <span key={href}>
                            <a
                              href={href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noreferrer" : undefined}
                              className="transition-colors hover:text-[#004C97]"
                            >
                              {label}
                            </a>
                            {contactIndex < contacts.length - 1 ? ", " : null}
                          </span>
                        );
                      })}
                    </li>
                  ) : null}
                </ul>
              </div>
            </section>
          );
        })}
        </div>

        <SupportCard text={t("support")} />
      </div>
    </main>
  );
};
