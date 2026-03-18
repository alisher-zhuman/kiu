import Image from "next/image";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { Link } from "@/i18n/navigation";

const FOOTER_MENU_LINKS = [
  {
    href: "/applicants",
    labelKey: "applicants.label",
  },
  {
    href: "/news",
    labelKey: "news",
  },
  {
    href: "/courses",
    labelKey: "courses",
  },
] as const;

const SOCIAL_ICONS = [Instagram, Facebook, Youtube] as const;

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
          className="h-auto w-90 opacity-15 sm:w-110 md:w-160"
        />
      </div>

      <div className="relative max-w-400 m-auto grid gap-14 px-5 py-10 md:grid-cols-[1fr_auto] md:px-10 md:py-14">
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

          <address className="mt-12 space-y-8 not-italic text-xl leading-9 md:text-3xl md:leading-[1.4]">
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

        <nav
          aria-label={footerT("menuTitle")}
          className="text-left md:justify-self-end md:text-right"
        >
          <p className="text-2xl font-semibold md:text-3xl">
            {footerT("menuTitle")}
          </p>

          <ul className="mt-6 space-y-4 text-xl md:space-y-6 md:text-3xl">
            {FOOTER_MENU_LINKS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-white/75"
                >
                  {navbarT(labelKey)}
                </Link>
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
