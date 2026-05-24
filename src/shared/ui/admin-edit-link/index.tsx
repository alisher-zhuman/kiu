import { PencilLine } from "lucide-react";

import { Link } from "@/i18n/navigation";

interface Props {
  ariaLabel: string;
  href: string;
  label: string;
}

export const AdminEditLink = ({ ariaLabel, href, label }: Props) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    className="inline-flex size-9 items-center justify-center rounded-full border border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] transition-colors hover:bg-[#004C97]/10 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
  >
    <PencilLine className="size-4 md:hidden" />
    <span className="hidden md:inline">{label}</span>
  </Link>
);
