import Image from "next/image";

import { Link } from "@/i18n/navigation";

import { FAX_LABEL, MAPS_URL, PHONE_LINKS } from "@/widgets/layout/constants";

interface Props {
  addressLine1: string;
  addressLine2: string;
  contactTitle: string;
  faxLabel: string;
  logoAlt: string;
  phoneLabel: string;
}

export const ContactBlock = ({
  addressLine1,
  addressLine2,
  contactTitle,
  faxLabel,
  logoAlt,
  phoneLabel,
}: Props) => {
  return (
    <div className="max-w-md">
      <Link href="/" className="inline-block">
        <Image
          src="/icons/logo.svg"
          alt={logoAlt}
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
            <span>{addressLine1}</span>
            <span>{addressLine2}</span>
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <p>{contactTitle}</p>

          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <span>{phoneLabel}</span>

            {PHONE_LINKS.map(({ href, label }, index) => (
              <span key={href}>
                <a href={href} className="transition-opacity hover:opacity-80">
                  {label}
                </a>

                {index < PHONE_LINKS.length - 1 && ","}
              </span>
            ))}
          </div>

          <p>
            {faxLabel} {FAX_LABEL}
          </p>
        </div>
      </address>
    </div>
  );
};
