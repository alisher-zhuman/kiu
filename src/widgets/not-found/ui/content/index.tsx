import { Link } from "@/i18n/navigation";

interface Props {
  action: string;
  description: string;
  title: string;
}

export const Content = ({ action, description, title }: Props) => (
  <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#ffea00]">
        404
      </p>
      <p className="text-8xl leading-none font-light text-white/15 sm:text-9xl">
        404
      </p>
    </div>

    <div className="max-w-2xl space-y-6">
      <div className="h-px w-24 bg-[#ffea00]" />

      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      <p className="max-w-xl text-base leading-8 text-white/80 sm:text-lg">
        {description}
      </p>

      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-[#ffea00] px-6 py-3 text-sm font-semibold text-[#004C97] transition-colors hover:bg-white"
      >
        {action}
      </Link>
    </div>
  </div>
);
