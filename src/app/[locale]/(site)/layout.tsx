import { type ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";

import { UserLayout } from "@/widgets/layout";

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const SiteLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <UserLayout>{children}</UserLayout>;
};

export default SiteLayout;
