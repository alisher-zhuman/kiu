import { Facebook, Instagram, Youtube } from "lucide-react";

import { SOCIAL_LINKS } from "../footer/constants";

const ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
} as const;

export const SocialLinks = () => (
  <ul className="mt-10 flex items-center gap-4">
    {SOCIAL_LINKS.map(({ href, label, icon }) => {
      const Icon = ICONS[icon];

      return (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex size-12 items-center justify-center rounded-xl bg-white p-3 text-[#004C97] transition-transform duration-200 hover:-translate-y-px hover:opacity-90 md:size-14"
          >
            <Icon size={26} strokeWidth={2} />
          </a>
        </li>
      );
    })}
  </ul>
);
