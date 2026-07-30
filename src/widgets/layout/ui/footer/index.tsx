"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { BgLogo } from "../bg-logo";
import { ContactBlock } from "../contact-block";
import { Navigation } from "../navigation";
import { SocialLinks } from "../social-links";

export const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const footerT = useTranslations("Footer");
  const headerT = useTranslations("Header");
  const navbarT = useTranslations("Navbar");

  return (
    <footer className="relative overflow-hidden bg-[#004C97] text-white">
      <BgLogo />

      <div className="relative max-w-400 m-auto flex flex-col gap-14 px-5 py-10 md:grid md:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] md:items-start md:px-10 md:py-14">
        <div>
          <ContactBlock
            addressLine1={footerT("address.line1")}
            addressLine2={footerT("address.line2")}
            contactTitle={footerT("contact.title")}
            faxLabel={footerT("contact.faxLabel")}
            logoAlt={headerT("logoAlt")}
            phoneLabel={footerT("contact.phoneLabel")}
          />
          <SocialLinks />
        </div>

        <Navigation
          getLabel={navbarT}
          menuTitle={footerT("menuTitle")}
          onToggleSection={(href) => setOpenSection((current) => (current === href ? null : href))}
          openSection={openSection}
        />
      </div>

      <div className="relative max-w-400 m-auto flex flex-col gap-1 px-5 pb-6 md:px-10 md:pb-8">
        <p className="text-sm text-white/90 md:text-lg">
          {footerT("copyright", { year: new Date().getFullYear() })}
        </p>
        <a
          href="https://www.linkedin.com/in/alisher-zhuman"
          target="_blank"
          rel="noreferrer"
          className="inline-block self-end text-right text-xs text-white/65 transition-colors hover:text-white/90 md:text-sm"
        >
          {footerT("developer")}
        </a>
      </div>
    </footer>
  );
};
