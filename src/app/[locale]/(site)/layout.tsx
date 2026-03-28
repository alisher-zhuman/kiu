import { type ReactNode } from "react";

import { UserLayout } from "@/widgets/layout/ui/user-layout";

interface Props {
  children: ReactNode;
}

const SiteLayout = ({ children }: Props) => {
  return <UserLayout>{children}</UserLayout>;
};

export default SiteLayout;
