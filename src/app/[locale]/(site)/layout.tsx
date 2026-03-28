import { type ReactNode } from "react";

import { UserLayout } from "@/widgets/layout/ui/user-layout";

interface Props {
  children: ReactNode;
}

const SiteLayout = ({ children }: Props) => <UserLayout>{children}</UserLayout>;

export default SiteLayout;
