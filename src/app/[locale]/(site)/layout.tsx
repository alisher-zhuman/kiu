import { type ReactNode } from "react";

import { Layout } from "@/widgets/layout";

interface Props {
  children: ReactNode;
}

const SiteLayout = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

export default SiteLayout;
