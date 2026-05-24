import { ExternalLink } from "lucide-react";

interface Props {
  ariaLabel: string;
  href: string;
  label: string;
}

export const AdminOpenFileLink = ({ ariaLabel, href, label }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={ariaLabel}
    className="inline-flex size-9 items-center justify-center rounded-full bg-[#004C97] text-white transition-colors hover:bg-[#002E5C] md:size-auto md:gap-2 md:px-4 md:py-2 md:text-sm md:font-semibold"
  >
    <ExternalLink className="size-4" />
    <span className="hidden md:inline">{label}</span>
  </a>
);
