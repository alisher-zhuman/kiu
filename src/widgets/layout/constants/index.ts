import { NAVBAR_LINKS } from "@/shared/constants";
import { type NavbarLink } from "@/shared/types";

interface SocialLink {
  href: string;
  label: string;
  icon: "instagram" | "facebook" | "youtube";
}

interface PhoneLink {
  href: string;
  label: string;
}

export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    href: "https://www.instagram.com/kyrgyzstan_islam_universiteti/",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://www.facebook.com/kiuniver?_rdr",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://www.youtube.com/channel/UC1qlOEbXXoVXoNZmQLEfkyA",
    label: "YouTube",
    icon: "youtube",
  },
] as const;

export const FOOTER_NAVBAR_LINKS: ReadonlyArray<NavbarLink> = [
  ...NAVBAR_LINKS.filter(({ href }) => href !== "/research"),
  ...NAVBAR_LINKS.filter(({ href }) => href === "/research"),
];

export const MAPS_URL = "https://go.2gis.com/UPwUS";

export const PHONE_LINKS: ReadonlyArray<PhoneLink> = [
  {
    href: "tel:+996312486171",
    label: "+(996) 312-48-61-71",
  },
  {
    href: "tel:+996312486272",
    label: "+(996) 312-48-62-72",
  },
] as const;

export const FAX_LABEL = "+(996) 312-48-61-79";
