"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { NAVBAR_LINKS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

const SOCIAL_ICONS = [Instagram, Facebook, Youtube] as const;
const FOOTER_NAVBAR_LINKS = [
  ...NAVBAR_LINKS.filter(({ href }) => href !== "/research"),
  ...NAVBAR_LINKS.filter(({ href }) => href === "/research"),
] as const;
const MAPS_URL = "https://go.2gis.com/UPwUS";
const PHONE_LINKS = [
  {
    href: "tel:+996312486171",
    label: "+(996) 312-48-61-71",
  },
  {
    href: "tel:+996312486272",
    label: "+(996) 312-48-62-72",
  },
] as const;
const FAX_LABEL = "+(996) 312-48-61-79";

export const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

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

      <div className="relative max-w-400 m-auto flex flex-col gap-14 px-5 py-10 md:grid md:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] md:items-start md:px-10 md:py-14">
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

          <address className="mt-12 flex flex-col gap-8 not-italic text-xl leading-9 md:text-2xl md:leading-[1.4]">
            <div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-col transition-opacity hover:opacity-80"
              >
                <span>{footerT("address.line1")}</span>
                <span>{footerT("address.line2")}</span>
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <p>{footerT("contact.title")}</p>

              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <span>{footerT("contact.phoneLabel")}</span>

                {PHONE_LINKS.map(({ href, label }, index) => (
                  <span key={href}>
                    <a
                      href={href}
                      className="transition-opacity hover:opacity-80"
                    >
                      {label}
                    </a>

                    {index < PHONE_LINKS.length - 1 && ","}
                  </span>
                ))}
              </div>

              <p>
                {footerT("contact.faxLabel")} {FAX_LABEL}
              </p>
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
          <ul className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-10 md:text-center">
            {FOOTER_NAVBAR_LINKS.map(({ href, labelKey, links }) => (
              <li key={href}>
                {links ? (
                  <div>
                    <button
                      type="button"
                      aria-expanded={openSection === href}
                      aria-controls={`footer-${href}-links`}
                      onClick={() =>
                        setOpenSection((current) =>
                          current === href ? null : href,
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 border-b border-white/15 pb-4 text-left text-xl font-medium text-white md:hidden"
                    >
                      <span>{navbarT(labelKey)}</span>

                      <ChevronDown
                        size={20}
                        strokeWidth={1.75}
                        className={cn(
                          "shrink-0 transition-transform duration-300 ease-out",
                          openSection === href && "rotate-180",
                        )}
                      />
                    </button>

                    <div
                      id={`footer-${href}-links`}
                      className={cn(
                        "grid transition-all duration-300 ease-out md:hidden",
                        openSection === href
                          ? "grid-rows-[1fr] pt-3 opacity-100"
                          : "grid-rows-[0fr] pt-0 opacity-0",
                      )}
                    >
                      <ul className="min-h-0 space-y-2 overflow-hidden pl-4 text-base text-white/80">
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

                    <div className="hidden md:block">
                      <p className="text-xl font-medium text-white md:text-2xl">
                        <span>{navbarT(labelKey)}</span>
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
