import { type ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { checkExternalHref } from "@/shared/helpers";

interface Props {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
  prefetch?: boolean;
}

export const NavigationLink = ({
  children,
  className,
  href,
  onClick,
  prefetch = false,
}: Props) =>
  checkExternalHref(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
