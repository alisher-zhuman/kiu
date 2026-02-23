import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const METADATA: Metadata = {
  title: "КИУ",
  description:
    "Кыргызстан Ислам Университетинин расмий сайты — жаңылыктар, кафедралар, билим берүү программалары жана студенттер үчүн маалымат.",
  icons: {
    icon: "/icons/logo.svg",
  },
  keywords: [
    "Кыргызстан Ислам Университети",
    "Кыргыз Ислам Университети",
    "KIU",
    "Islam University Kyrgyzstan",
    "Кыргызстан",
    "университет",
    "жогорку окуу жай",
    "ислам билим берүү",
    "теология",
    "шариат",
    "кафедралар",
    "абитуриент",
    "студент",
    "жаңылыктар",
    "Бишкек",
  ],
  authors: [
    {
      name: "Alisher Zhuman",
      url: "https://www.linkedin.com/in/alisher-zhuman",
    },
  ],
  creator: "Alisher Zhuman",
  publisher: "Кыргызстан Ислам Университети",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Кыргызстан Ислам Университети — расмий сайт",
    description:
      "Жаңылыктар, кабыл алуу, факультеттер жана билим берүү программалары тууралуу маалымат.",
    url: SITE_URL,
    siteName: "Кыргызстан Ислам Университети",
    images: [
      {
        url: "/icons/logo.svg",
        width: 1200,
        height: 630,
        alt: "Кыргызстан Ислам Университети — расмий сайт",
      },
    ],
    locale: "ky_KG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Кыргызстан Ислам Университети",
    description:
      "Кыргызстан Ислам Университетинин расмий сайты — жаңылыктар, кабыл алуу жана факультеттер.",
    images: ["/icons/logo.svg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};
