import { Link } from "@/i18n/navigation";

import { PageTitle } from "@/shared/ui/page-title";

interface Props {
  action: string;
  description: string;
  title: string;
}

export const Content = ({ action, description, title }: Props) => (
  <div className="space-y-10 md:space-y-12">
    <div className="space-y-4 md:space-y-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004C97]">
        404
      </p>

      <PageTitle id="not-found-title" className="text-3xl sm:text-4xl md:text-5xl">{title}</PageTitle>
    </div>

    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
      <div className="max-w-3xl space-y-6">
        <p className="text-base leading-8 text-black/70 sm:text-lg">
          {description}
        </p>

        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-[#004C97] px-6 py-3 text-sm font-semibold text-[#004C97] transition-all duration-200 hover:-translate-y-px hover:bg-[#004C97] hover:text-white"
        >
          {action}
        </Link>
      </div>

      <p className="select-none text-8xl font-semibold leading-none text-[#004C97]/10 sm:text-9xl md:text-[12rem]">
        404
      </p>
    </div>
  </div>
);
