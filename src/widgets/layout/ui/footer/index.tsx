import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { NAVBAR_LINKS } from "@/shared/constants";

const SOCIAL_ICONS = [Instagram, Facebook, Youtube] as const;
const FOOTER_NAVBAR_LINKS = [
  ...NAVBAR_LINKS.filter(({ href }) => href !== "/research"),
  ...NAVBAR_LINKS.filter(({ href }) => href === "/research"),
] as const;

export const Footer = () => {
  const footerT = useTranslations("Footer");
  const headerT = useTranslations("Header");
  const navbarT = useTranslations("Navbar");

  return (
    <footer className="relative mt-30 overflow-hidden bg-[#004C97] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/icons/logo.svg"
          alt=""
          width={620}
          height={620}
          className="h-auto w-90 opacity-15 sm:w-110 md:w-170"
        />
      </div>

      <div className="relative max-w-400 m-auto grid gap-14 px-5 py-10 md:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] md:items-start md:px-10 md:py-14">
        <div className="max-w-md">
          <Link href="/" className="inline-block">
            <Image
              src="/icons/logo.svg"
              alt={headerT("logoAlt")}
              width={96}
              height={96}
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </Link>

          <address className="mt-12 space-y-8 not-italic text-xl leading-9 md:text-2xl md:leading-[1.4]">
            <div>
              <p>{footerT("address.line1")}</p>
              <p>{footerT("address.line2")}</p>
            </div>

            <div>
              <p>{footerT("contact.title")}</p>
              <p>{footerT("contact.phone")}</p>
              <p>{footerT("contact.fax")}</p>
            </div>
          </address>

          <ul className="mt-12 flex items-center gap-4" aria-hidden="true">
            {SOCIAL_ICONS.map((Icon) => (
              <li key={Icon.displayName ?? Icon.name}>
                <div className="flex size-12 items-center justify-center rounded-xl bg-white text-[#004C97] md:size-14">
                  <Icon size={26} strokeWidth={2} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={footerT("menuTitle")} className="md:pt-12">
          <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-10 md:text-center">
            {FOOTER_NAVBAR_LINKS.map(({ href, labelKey, links }) => (
              <li key={href}>
                {links ? (
                  <div>
                    <details className="group border-b border-white/15 pb-4 md:hidden">
                      <summary className="flex list-none items-center justify-between gap-4 text-xl font-medium text-white [&::-webkit-details-marker]:hidden">
                        <span>{navbarT(labelKey)}</span>

                        <ChevronDown
                          size={20}
                          strokeWidth={1.75}
                          className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>

                      <ul className="mt-3 space-y-2 pl-4 text-base text-white/80">
                        {links.map(
                          ({ href: nestedHref, labelKey: nestedLabelKey }) => (
                            <li key={nestedHref}>
                              <Link
                                href={nestedHref}
                                className="transition-colors hover:text-white"
                              >
                                {navbarT(nestedLabelKey)}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </details>

                    <div className="hidden md:block">
                      <p className="text-xl font-medium text-white md:text-2xl">
                        {navbarT(labelKey)}
                      </p>

                      <ul className="mt-3 space-y-2 text-base text-white/80 md:text-lg">
                        {links.map(
                          ({ href: nestedHref, labelKey: nestedLabelKey }) => (
                            <li key={nestedHref}>
                              <Link
                                href={nestedHref}
                                className="transition-colors hover:text-white"
                              >
                                {navbarT(nestedLabelKey)}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={href}
                    className="block border-b border-white/15 pb-4 text-xl font-medium transition-colors hover:text-white/75 md:border-0 md:pb-0 md:text-2xl"
                  >
                    {navbarT(labelKey)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative max-w-400 m-auto px-5 pb-6 md:px-10 md:pb-8">
        <p className="text-sm text-white/90 md:text-lg">
          {footerT("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};
