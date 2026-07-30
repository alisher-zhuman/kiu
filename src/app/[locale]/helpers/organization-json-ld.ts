import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

import { SITE_URL } from "@/shared/constants";

import { buildCanonicalUrl } from "./metadata";

export const getOrganizationJsonLd = async (locale: AppLocale) => {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: t("publisher"),
    url: buildCanonicalUrl(locale),
    logo: `${SITE_URL}/icons/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Гоголя 57",
      addressLocality: "Бишкек",
      addressCountry: "KG",
    },
    telephone: "+996312486171",
    faxNumber: "+996312486179",
    sameAs: [
      "https://www.instagram.com/kyrgyzstan_islam_universiteti/",
      "https://www.facebook.com/kiuniver",
      "https://www.youtube.com/channel/UC1qlOEbXXoVXoNZmQLEfkyA",
    ],
  };
};
